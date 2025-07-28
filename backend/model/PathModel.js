const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userid:{
    type:String
  },
  Name: {
    type: String,
  },
  category: {
    type: String,
  },
    date:{
    type:String
  },
  from:{
    type:String
  },
  to:{
    type:String
  },
  plateNumber:{
    type:String
  },
  rate: [
    {
      userid: {
        type: String,
      },
      username:{
        type:String
      },
      date:{
        type:Date,
       default: () => new Date().toISOString().split('T')[0],
      },
      rating: {
        type: Number,
      },
      review:{
        type:String
      }

    },
  ],
  timeFrom: {
    type: String,
  },
  timeTo: {
    type: String,
  },
  timetravel: {
    type: String,
  },
  facilities: [
    {
      wifi: {
        type: Boolean,
      },
      chargingpoint: {
        type: Boolean,
      },
      blanket: {
        type: Boolean,
      },
      waterbottle: {
        type: Boolean,
      },
    },
  ],
  price: {
    type: String,
  },
  totalseat:{
    type:Number
  },
  seats: [
    {
      seatNumber: String, // e.g., "A1", "B2"
      isBooked: { type: Boolean, default: false },
      bookedBy: {
           type: mongoose.Schema.Types.ObjectId, ref: 'Sign',
        default: null,
      },
      amount:{
        type:String
      }
    },
  ],
  phoneNumber:{
    type:String
  },
  seatempty: {
    type: Number,
  },
  images:[String],
  status:{
    type:String,
    enum:['active','inactive'],
    default:'active'
  }
},{timestamps:true});

const path = mongoose.model("path", schema);

module.exports = path;
