const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String, // or Date if you're storing it as Date
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  city: {
    type: String,
    required: true
  },
  agreeToTerms: {
    type: Boolean,
    required: true
  },
  role:{
    type:String,
    enum:['user','operator','admin'],
    default:'user'
  }
}, { timestamps: true });

const Sign = mongoose.model('Sign', schema);

module.exports = Sign;
