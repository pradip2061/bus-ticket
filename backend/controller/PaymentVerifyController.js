const path = require("../model/PathModel");
const axios = require("axios");
const Booking = require("../model/BookingModel"); // adjust if needed
const Sign = require("../model/SignUpModel");

const paymentverify = async (req, res) => {
  const { busid, seats, amount, refId, transactionCode, paymentStatus } = req.body;
  const userId = req.user;

  try {

    const userinfo = await Sign.findOne({_id:userId})
    if (busid) {
      const bus = await path.findById(busid);
      if (!bus) return res.status(404).json({ message: "Bus not found" });

      // 3. Update seats
      bus.seats = bus.seats.map((seat) => {
        if (seats.includes(seat.seatNumber)) {
          return {
            ...seat,
            isBooked: true,
            bookedBy: userId,
            amount:amount
          };
        }
        return seat;
      });

      await bus.save();

      // 4. Save booking
      await Booking.create({
        user: userId,
        Name:userinfo.firstName+userinfo.lastName,
        email:userinfo.email,
        phoneNumber:userinfo.phone,
        bus: busid,
        seatNumber: seats,
        paymentStatus: "PAID",
        refId,
        amount,
      });

      return res.status(200).json({ verified: true, message: "Seat booked successfully" });
    } else {
      return res.status(400).json({ verified: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("eSewa verification error:", error.message);
    return res.status(500).json({ verified: false, message: "Internal server error" });
  }
};

module.exports = paymentverify;

const secret ="8gBm/:&EnhH.1/q"
const CryptoJS =require("crypto-js");

const paymentinitiate = async (req, res) => {
  try {
    const { total_amount, transaction_uuid, product_code } = req.body;

    if ( !total_amount || !transaction_uuid || !product_code ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
    return hashedSignature;
  };

    const hashedSignature = generateSignature(
        total_amount,
        transaction_uuid,
        product_code,
        secret
      );


    return res.status(200).json({
      hashedSignature
    });
  } catch (error) {
    console.error("Esewa Payment Init Error:", error);
    return res.status(500).json({ error: "Esewa payment initiation failed" });
  }
};

module.exports = { paymentverify, paymentinitiate };
