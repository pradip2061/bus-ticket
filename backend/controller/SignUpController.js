const bcrypt = require("bcryptjs");
const validator = require("validator");
const sign = require("../model/SignUpModel");
const signup = async (req, res) => {
  try {
    console.log(req.body)
    const {formData}= req.body
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      city,
      agreeToTerms,
    } = formData;
    console.log(email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      city,
      agreeToTerms,)
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phone ||
      !dateOfBirth ||
      !gender ||
      !city ||
      !agreeToTerms
    ) {
      return res.status(400).json({ message: "fill the form properly!" });
    }

    // 2. Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    
    if (phone.length < 10) {
      return res
        .status(400)
        .json({ message: "Phone number must be at least 8 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExists = await sign.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 6. Hash and Save
    const hashedPassword = await bcrypt.hash(password, 10);
    await sign.create({
      email,
      confirmPassword: hashedPassword,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      city,
      agreeToTerms,
    });

    res.status(200).json({ message: "signup successfully!" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = signup;
