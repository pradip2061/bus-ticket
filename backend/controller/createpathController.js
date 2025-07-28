const Path = require("../model/PathModel");
const Sign = require("../model/SignUpModel");

const createpath = async (req, res) => {
  try {
    const {
      Name,
      category,
      date,
      from,
      to,
      timeFrom,
      timeTo,
      timetravel,
      wifi,
      chargingpoint,
      blanket,
      waterbottle,
      price,
      totalseat,
      plateNumber
    } = req.body;

    const userid =req.user

    // Check if images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Image upload failed!" });
    }

    const userinfo = await Sign.findOne({_id:userid})
    // Capitalize helper
    const capitalizeWords = (text) =>
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const fromplace = capitalizeWords(from);
    const toplace = capitalizeWords(to);

    // Prepare image path array
    const imagePaths = req.files.map((file) => file.path); 

    // Generate seat labels
    const seats = [];
    const half = Math.ceil(totalseat / 2);
    for (let i = 0; i < half; i++) {
      seats.push({
        seatNumber: `A${i + 1}`,
        isBooked: false,
        bookedBy: null,
        amount:''
      });
    }
    for (let i = 0; i < totalseat - half; i++) {
      seats.push({
        seatNumber: `B${i + 1}`,
        isBooked: false,
        bookedBy: null,
         amount:''
      });
    }

    // Create and save the new path
    const newPath = new Path({
      userid,
      Name,
      category,
      date,
      from: fromplace,
      to: toplace,
      timeFrom,
      timeTo,
      timetravel,
      rate: [],
      phoneNumber:userinfo.phone,
      facilities: [
        {
          wifi: !!wifi,
          chargingpoint: !!chargingpoint,
          blanket: !!blanket,
          waterbottle: !!waterbottle,
        },
      ],
      seats,
      price,
      totalseat,
      seatempty: totalseat,
      images: imagePaths,
      plateNumber// directly storing image paths here
    });

    await newPath.save();

    res.status(201).json({
      message: "Bus created successfully",
      pathId: newPath._id,
      images: imagePaths,
    });
  } catch (error) {
    console.error("Error creating bus:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = createpath;
