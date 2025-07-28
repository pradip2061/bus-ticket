const express =require('express')
const {AcceptorReject, statusSet, deletePath, updatePath, getDashboardData, updateseatstatus}= require('../controller/AdminContoller')
const checkCookieAuth = require('../middleware/AuthCheck')
const AdminRouter = express.Router()

AdminRouter.post('/setstatus',checkCookieAuth,AcceptorReject)

AdminRouter.post('/setstatuspath',statusSet)

AdminRouter.post('/deletepath',deletePath)
AdminRouter.post('/updatepath',updatePath)
AdminRouter.get('/getadmin',checkCookieAuth,getDashboardData)
AdminRouter.put('/updateSeatStatus',checkCookieAuth,updateseatstatus)
module.exports = AdminRouter