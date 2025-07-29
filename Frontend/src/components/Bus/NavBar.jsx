import { Menu, X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../../features/auth/logout/LogoutThunk";
import { toast } from "react-toastify";
import { resetdataLogout } from "../../../features/auth/logout/LogoutSlice";


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
const navigate = useNavigate()
const dispatch =useDispatch()
  const { role } = useSelector((state) => state.login);
const status = useSelector((state)=>state.logout.status)
const message = useSelector((state)=>state.logout.message)
const error = useSelector((state)=>state.logout.error)
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handlelogout =async()=>{
    try {
      dispatch(logoutThunk())
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
  if (message) {
    dispatch(resetdataLogout())
    toast.info(message);
    navigate('/',{replace:true})
  } else if (error) {
    toast.error(error);
  }
}, [message, error]);


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center h-20 pr-6  lg:px-16">
        {/* Logo & Name */}
         <div className="flex items-center lg:py-0 overflow-hidden">
          <img
            src={logo}
            alt="logo"
            className="h-18 w-auto object-contain scale-140 mb-0 "
          />
          <span className="text-xl lg:text-2xl  ml-26 lg:ml-0 font-bold text-blue-400 lg:text-blue-500 absolute lg:relative sm:inline">
            यात्रा Nepal
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {["/", "/mybookings", "/contactus"].map((path, index) => {
            const labels = ["Home", "My Bookings", "Contact Us"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600 transition"
                }
              >
                {labels[index]}
              </NavLink>
            );
          })}
        </nav>

        {
          role  === 'operator' &&   <button className=" absolute hidden lg:flex ml-[66rem] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition" onClick={()=>navigate('/adminDashBoard')}>
            AdminDashBoard
          </button>
        }
     {
     !localStorage.getItem('isLogin') ?     <div className="hidden lg:flex gap-3 items-center">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition" onClick={()=>navigate('/loginAndsignin',{ state: 'login' })}>
            Log In
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition" onClick={()=>navigate('/loginAndsignin',{ state: 'signup' })}>
            Sign In
          </button>
        </div>: <button className="px-4 py-2 border hidden lg:flex border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition mr-20 disabled:opacity-50" onClick={handlelogout} disabled={status === 'pending'}>
            { status === 'pending' ? 'logout...':'logout'}
          </button>
     }

        {/* Mobile Hamburger Icon */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden px-5 pb-4 space-y-4 bg-white shadow-md border-t border-gray-300 pt-4"
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block text-blue-600 font-semibold"
                : "block text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/mybookings"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block text-blue-600 font-semibold"
                : "block text-gray-700 hover:text-blue-600"
            }
          >
            My Bookings
          </NavLink>
          <NavLink
            to="/contactus"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block text-blue-600 font-semibold"
                : "block text-gray-700 hover:text-blue-600"
            }
          >
            Contact Us
          </NavLink>
    {
          role  === 'operator' &&   <button className=" absolute  ml-[66rem] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition" onClick={()=>navigate('/adminDashBoard')}>
            AdminDashBoard
          </button>
        }
      {
        !localStorage.getItem('isLogin') ?     <div className="pt-2 border-t border-gray-200">
            <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition mb-2" onClick={()=>navigate('/loginAndsignin',{ state: 'login' },setMenuOpen(false))}>
              Log In
            </button>
            <button className="w-full text-left px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition" onClick={()=>navigate('/loginAndsignin',{ state: 'signup' },setMenuOpen(false))}>
              Sign In
            </button>
          </div>: <button className="w-full text-left px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition disabled:opacity-50" onClick={handlelogout} disabled={status === 'pending'}>
               { status === 'pending' ? 'logout...':'logout'}
            </button>
      }
        </div>
      )}
    </header>
  );
};

export default NavBar;
