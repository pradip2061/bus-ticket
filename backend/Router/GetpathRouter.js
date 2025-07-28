const express =require('express')
const {getpath, getindividualpath, recentPath, getbookedpath, bookeddata, getpathoperator}= require('../controller/GetPathController')
const checkCookieAuth = require('../middleware/AuthCheck')
const getpathRouter = express.Router()

getpathRouter.get('/getpath',checkCookieAuth,getpath)
getpathRouter.get('/getpathsolo',getindividualpath)
getpathRouter.get('/getrecentpath',recentPath)
getpathRouter.get('/getbookedpath',checkCookieAuth,getbookedpath)
getpathRouter.get('/getbookedpathAdmin',checkCookieAuth,bookeddata)
getpathRouter.get('/getpathoperator',checkCookieAuth,getpathoperator)
module.exports = getpathRouter