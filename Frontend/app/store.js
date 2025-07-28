import { configureStore } from '@reduxjs/toolkit'
import signupreducer from '../features/auth/signup/SignupSlice'
import loginreducer from '../features/auth/login/LoginSlice'
import logoutreducer from '../features/auth/logout/LogoutSlice'
import getpathreducer from '../features/booking/getpathdata/getpathSlice'
import getpathsoloreducer from '../features/booking/getpathdata/getpathsolo.Slice'
import getpathrecentreducer from '../features/booking/getpathdata/getrecentpath/getrecentpathSlice'
import createpathReducer from '../features/booking/createpath/CreatepathSlice'
const store = configureStore({
   reducer:{
     signup:signupreducer,
     login:loginreducer,
     logout:logoutreducer,
     getpath:getpathreducer,
     getpathsolo:getpathsoloreducer,
     getpathrecent:getpathrecentreducer,
     createpath:createpathReducer
   }
})

export default store