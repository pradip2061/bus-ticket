// middlewares/checkrole.js

const jwt = require("jsonwebtoken");
const Sign = require("../model/SignUpModel");

const checkrole =async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Please login first." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const userinfo = await Sign.findOne({_id:decoded.id})
    res.status(200).json({role:userinfo.role})
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = checkrole;
