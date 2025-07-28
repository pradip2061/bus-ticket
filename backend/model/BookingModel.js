const mongoose = require('mongoose')

const schema = new mongoose.Schema({
     user:{
        type:String
     },
     Name:{
        type:String
     },
     email:{
    type:String
     },
     phoneNumber:{
        type:String
     },
        bus: {
            type: mongoose.Schema.Types.ObjectId, ref: 'path'
        },
        seatNumber:[String],
        paymentStatus:{
            type:String,
            enum:['PAID','REJECTED','ACCEPTED']
        },
        refId:{
            type:String
        },
        amount:{
            type:String
        },
})

const Booking = mongoose.model('Booking',schema)
module.exports = Booking