const Contact = require('../models/Contact');

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({ name, email, message });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports=sendMessage