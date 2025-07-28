const express =require('express')
const createpath = require('../controller/createpathController')
const checkCookieAuth = require('../middleware/AuthCheck')
const { upload } = require('../middleware/upload')
const createpathRouter = express.Router()

createpathRouter.post('/createpath',checkCookieAuth,upload.array('images'),createpath)

module.exports = createpathRouter