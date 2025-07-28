const express = require('express')
const checkCookieAuth = require('../middleware/AuthCheck')
const rating = require('../controller/ratingController')
const ratingRouter =express.Router()

ratingRouter.post('/ratebus',checkCookieAuth,rating)
module.exports =ratingRouter