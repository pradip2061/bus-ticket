const Booking = require("../model/BookingModel");
const path = require("../model/PathModel");

const getpath =async(req,res)=>{
const{from,to,date}=req.query
const userid = req.user
console.log(from,to,date)
if (!from || !to || !date) {
    return res.status(400).json({ message: "from, to, and date are required" });
  }
    if (
    typeof from !== 'string' ||
    typeof to !== 'string' ||
    typeof date !== 'string'
  ) {
    return res.status(400).json({ message: 'Invalid input type' });
  }
   try {
    const paths = await path.find({
      from,
      to,
      date
    });
    console.log(paths)
    res.status(200).json({paths,userid});
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }

}
const getindividualpath = async(req,res)=>{
  try {
    const{busid}=req.query
if(!busid){
  return res.status(404).json({message:"bus id not found"})
}
  const businfo = await path.findOne({_id:busid})
  if(!businfo){
     return res.status(404).json({message:"bus not found"})
  }
  res.status(200).json({message:"businfo fetch successfully",businfo})
  } catch (error) {
    console.log(error)
  }
}

const recentPath=async(req,res)=>{
try {
    const recentBuses = await path.find().sort({ createdAt: -1 }).limit(10);
    if(!recentBuses){
      return res.status(400).json({message:"something error occur"})
    }
    res.status(200).json({message:"path fetch successfully",recentBuses})
} catch (error) {
  console.log(error)
}
}

const getbookedpath = async (req, res) => {
  try {
    const userid = req.user;

    const bookings = await Booking.find({ user: userid }).populate({
      path: 'bus',
      select: 'Name from to timeFrom timeTo facilities category images phoneNumber date timetravel'
    });

    if (!bookings || bookings.length === 0) {
      return res.status(400).json({ message: "You haven't booked yet" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getpathoperator = async (req, res) => {
  try {
    const userid = req.user;

    const paths = await path.find({ userid}).select('Name price from to timetravel status date totalseat category plateNumber').sort({ createdAt: -1 })

       if (!paths.length) {
      return res.status(404).json({ message: "No paths found" });
    }
    
    res.status(200).json({
      paths
    });
  } catch (err) {
    console.error("Error fetching paths:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const bookeddata = async (req, res) => {
  try {
    const userid = req.user;

    const activePaths = await Booking.find({ paymentStatus: 'PAID' }).populate({
      path: 'bus',
      select: 'userid Name category from to images date plateNumber',
    });

    // Filter only buses that match the current user ID
    const filteredPaths = activePaths.filter(
      (item) => item.bus && item.bus.userid === userid
    );

    if (!filteredPaths || filteredPaths.length === 0) {
      return res.status(400).json({ message: "You haven't booked yet" });
    }

    res.status(200).json({ activePaths: filteredPaths });
  } catch (err) {
    console.error('Error fetching booked data:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};





module.exports = {getpath,getindividualpath,recentPath,getbookedpath,getpathoperator,bookeddata}