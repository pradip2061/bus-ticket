const express = require('express')
const signup = require('../controller/SignUpController')
const {login,logout} = require('../controller/LoginController')
const checkrole = require('../middleware/CheckRole')
const loginsignup = express.Router()

loginsignup.post('/signup',signup)
loginsignup.post('/login',login)
loginsignup.get('/logout',logout)
loginsignup.get('/checktoken',checkrole)
module.exports = loginsignup