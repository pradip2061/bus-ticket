// middlewares/checkCookieAuth.js

const jwt = require("jsonwebtoken");
const Sign = require("../model/SignUpModel");

const checkCookieAuth =async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Please login first." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const userinfo = await Sign.findOne({_id:decoded.id})
    req.user = decoded.id; 
    req.role=userinfo.role
    // Attach decoded payload (e.g. user info) to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = checkCookieAuth;
