// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginsignup = require('./Router/LoginSignUpRouter');
const connectToDatabase = require('./database');
const createpathRouter = require('./Router/CreatePathRouter');
const getpathRouter = require('./Router/GetpathRouter');
const ratingRouter = require('./Router/RatingRouter');
const paymentverifyRouter = require('./Router/PaymentVerifyRouter');
const AdminRouter = require('./Router/AdminApiController');
const app = express();
connectToDatabase()
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend's origin
  credentials: true               // 🔥 Allow credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/yatranepal',loginsignup,createpathRouter,getpathRouter,ratingRouter,paymentverifyRouter,AdminRouter)

module.exports = app;
