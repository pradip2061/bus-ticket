const Booking = require("../model/BookingModel");
const path = require("../model/PathModel");

const AcceptorReject = async (req, res) => {
  try {
    const { status, bookingid } = req.body;

    // Validate input
    if (!status || !bookingid) {
      return res.status(400).json({ message: "Status and booking ID are required" });
    }

    // Allow only specific statuses
    const allowedStatuses = ['PAID', 'REJECTED','ACCEPTED'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find booking
    const booking = await Booking.findById(bookingid);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (req.role !== 'operator') {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update paymentStatus
    booking.paymentStatus = status;
    await booking.save();

    return res.status(200).json({ message: 'Status updated successfully', booking });
  } catch (err) {
    console.error("Error updating booking status:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const statusSet = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Validate request
    if (!id || !status) {
      return res.status(400).json({ message: "ID and status are required" });
    }

    // Find path by ID
    const pathDoc = await path.findById(id);
    if (!pathDoc) {
      return res.status(404).json({ message: "Path not found" });
    }

    pathDoc.status = status;

    await pathDoc.save();

    res.status(200).json({
      message: "Status updated successfully",
      updatedPath: pathDoc,
    });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePath = async (req, res) => {
  try {
    const { id } = req.body;

    // Validate
    if (!id) {
      return res.status(400).json({ message: "Path ID is required" });
    }

    // Delete path
    const deletedPath = await path.findByIdAndDelete(id);

    if (!deletedPath) {
      return res.status(404).json({ message: "Path not found" });
    }

    res.status(200).json({ message: "Path deleted successfully" });
  } catch (err) {
    console.error("Error deleting path:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePath = async (req, res) => {
  try {
    const { formValues, busid } = req.body;
    if (!busid) {
      return res.status(400).json({ message: "Path ID (busid) is required" });
    }

    const { date, timetravel, price, from, to } = formValues || {};

    // Build updateFields dynamically, ignore empty strings/null
    const updateFields = {};
    if (date?.trim()) updateFields.date = date;
    if (timetravel?.trim()) updateFields.timetravel = timetravel;
    if (price !== undefined && price !== null && price !== "") updateFields.price = price;
    if (from?.trim()) updateFields.from = from;
    if (to?.trim()) updateFields.to = to;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No valid fields provided to update" });
    }

    const updatedPath = await path.findByIdAndUpdate(
      busid, 
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedPath) {
      return res.status(404).json({ message: "Path not found" });
    }

    console.log(updatedPath)
    res.status(200).json({
      message: "Path updated successfully",
      data: updatedPath
    });
  } catch (error) {
    console.error("Update Path Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


 const  dayjs = require('dayjs')

const getDashboardData = async (req, res) => {
  try {
    const userid = req.user; // assuming user ID is available in req.user

    // Fetch only buses owned by the logged-in user
    const buses = await path.find({ userid: userid }); 

    const totalBuses = buses.length;
    const activeBusesList = buses.filter(bus => bus.status === 'active');
    const activeBusesCount = activeBusesList.length;

    // Calculate today's and yesterday's bookings
    const todayStart = dayjs().startOf('day').toDate();
    const todayEnd = dayjs().endOf('day').toDate();
    const yesterdayStart = dayjs().subtract(1, 'day').startOf('day').toDate();
    const yesterdayEnd = dayjs().subtract(1, 'day').endOf('day').toDate();

    let todayBookings = 0;
    let yesterdayBookings = 0;

    buses.forEach(bus => {
      bus.seats.forEach(seat => {
        if (!seat.isAvailable && seat.bookedAt) {
          if (seat.bookedAt >= todayStart && seat.bookedAt <= todayEnd) {
            todayBookings++;
          } else if (
            seat.bookedAt >= yesterdayStart &&
            seat.bookedAt <= yesterdayEnd
          ) {
            yesterdayBookings++;
          }
        }
      });
    });

    // Calculate percentage change
    let bookingTrend = '0%';
    if (yesterdayBookings > 0) {
      const change =
        ((todayBookings - yesterdayBookings) / yesterdayBookings) * 100;
      bookingTrend = `${change.toFixed(1)}% ${
        change >= 0 ? 'increase' : 'decrease'
      }`;
    }

    return res.json({
      totalBuses,
      activeBuses: activeBusesCount,
      todayBookings,
      bookingTrend,
      activeBusList: activeBusesList, // ✅ only this user's active buses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateseatstatus = async (req, res) => {
  try {
    const { busid, seatId, isBooked } = req.body;
    const userId = req.user; // Make sure req.user is set by auth middleware

    if (!busid || !seatId || typeof isBooked !== "boolean") {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    // ✅ Find the bus
    const bus = await path.findById(busid);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    // ✅ Find the seat inside the bus
    const seatIndex = bus.seats.findIndex((s) => s._id.toString() === seatId);
    if (seatIndex === -1) {
      return res.status(404).json({ message: "Seat not found." });
    }

    // ✅ Update the seat status
    bus.seats[seatIndex].isBooked = isBooked;

    if (isBooked) {
      // ✅ Booking seat
      bus.seats[seatIndex].bookedBy = userId;
      bus.seats[seatIndex].amount = bus.price;
    } else {
      // ✅ Unbooking seat
      bus.seats[seatIndex].bookedBy = null;
      bus.seats[seatIndex].amount = null;
    }

    await bus.save();

    return res.status(200).json({
      message: `Seat ${bus.seats[seatIndex].seatNumber} ${
        isBooked ? "booked" : "unbooked"
      } successfully.`,
      updatedSeat: bus.seats[seatIndex],
    });
  } catch (error) {
    console.error("Error updating seat:", error);
    return res.status(500).json({ message: "Server error." });
  }
};



module.exports = {AcceptorReject,statusSet,deletePath,updatePath,getDashboardData,updateseatstatus}