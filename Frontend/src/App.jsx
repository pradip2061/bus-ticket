import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/Bus/NavBar";
import Footer from "./components/Bus/Footer";
import BusLoading from "./components/common/BusLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyBookings = lazy(() => import("./pages/MyBookings"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Path = lazy(() => import("./pages/Path"));
const LoginSignUp = lazy(() => import("./pages/LoginSignUp"));
const Success = lazy(() => import("./pages/Success"));
const Home = lazy(() => import("./pages/Home"));
import { Provider, useDispatch } from "react-redux";
import store from "../app/store";
import ScrollToTop from "./components/common/ScrollToTop";
import BookingSeat from "./pages/BookingSeat";
import Failure from "./pages/esewa/Failure";
import Successesewa from "./pages/esewa/SuccessEsewa";
import SuccessEsewa from "./pages/esewa/SuccessEsewa";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import Protected from "./components/auth/Protected";
import ViewSeats from "./pages/Admin/pages/ViewSeats";
import { useEffect } from "react";
import axios from "axios";
import { setRole } from "../features/auth/login/LoginSlice";
const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooterPaths = ["/loginAndsignin", "/success","/adminDashBoard"];
  const shouldHide = hideHeaderFooterPaths.includes(location.pathname);
  const hideHeaderFooterPathsfooter = ["/loginAndsignin", "/success"];
  const shouldHidefooter = hideHeaderFooterPathsfooter.includes(location.pathname);
const dispatch = useDispatch()
  useEffect(()=>{
 const checktoken=async()=>{
     const response =await axios.get(`${import.meta.env.VITE_BASE_URL}/checktoken`,{
      withCredentials:true
    })
    if(response.status === 200){
      dispatch(setRole(response.data.role))
    }
 }
 checktoken()
  },[])
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<BusLoading />}>
        {!shouldHide && <NavBar />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/path" element={<Path />} />
          <Route path="/loginAndsignin" element={<LoginSignUp />} />
          <Route path="/success" element={<Success />} />
          <Route path="/bookseat/:busid" element={<BookingSeat />} />
          <Route path="/successesewa/:busid" element={<SuccessEsewa />} />
          <Route path="/failure" element={<Failure />} />
          <Route
            path="/adminDashBoard"
            element={
              <Protected>
                <AdminDashBoard />
              </Protected>
            }
          />
          <Route path="/viewseat/:id" element={<ViewSeats/>} />
        </Routes>
        {!shouldHidefooter && <Footer />}
      </Suspense>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
