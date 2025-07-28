const express = require('express')
const {paymentverify, paymentinitiate} = require('../controller/PaymentVerifyController')
const checkCookieAuth = require('../middleware/AuthCheck')
const paymentverifyRouter = express.Router()
paymentverifyRouter.post('/esewa/verify',checkCookieAuth,paymentverify)
paymentverifyRouter.post('/esewa/initiate',paymentinitiate)

module.exports=paymentverifyRouter