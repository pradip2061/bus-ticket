import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone,
  Calendar, MapPin, Bus
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from '../../features/auth/signup/SignupThunk';
import { loginThunk } from '../../features/auth/login/LoginThunk';
import { resetdataLogin } from '../../features/auth/login/LoginSlice';
import { resetdata } from '../../features/auth/signup/SignupSlice';
import { toast } from 'react-toastify';

export default function LoginSignup() {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const errorSignup = useSelector((state) => state.signup.error);
  const messageSignup = useSelector((state) => state.signup.message);
  const errorLogin = useSelector((state) => state.login.error);
  const messageLogin = useSelector((state) => state.login.message);
  const role = useSelector((state) => state.login.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMode(location.state || 'login');
  }, [location]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        setIsLoading(true);
        await dispatch(signupThunk(formData));
        dispatch(resetdata());
        setIsLoading(false);
      } else {
        setIsLoading(true);
        await dispatch(loginThunk(formData));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Toast messages
  useEffect(() => {
    if (messageSignup) {
      toast.success(messageSignup);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        city: '',
        agreeToTerms: false,
      });
      setMode('login');
    } else if (errorSignup) {
      toast.error(errorSignup);
    } else if (messageLogin) {
      toast.success(messageLogin);
      setFormData({
        email: '',
        password: '',
      });
    } else if (errorLogin) {
      toast.error(errorLogin);
    }
  }, [messageSignup, errorSignup, messageLogin, errorLogin]);

  // ✅ Redirect based on role after login
  useEffect(() => {
    if (messageLogin && role) {
      if (role === 'operator') {
        navigate('/adminDashBoard');
      } else {
        navigate('/');
      }
    }
  }, [messageLogin, role, navigate]);

  const onBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {mode === 'login' ? 'Welcome Back' : 'Join यात्रा Nepal'}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                mode === 'login' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                mode === 'signup' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" />
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required className="w-full pl-10 py-3 border rounded-xl" />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required className="w-full pl-10 py-3 border rounded-xl" />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" />
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required className="w-full pl-10 py-3 border rounded-xl" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" />
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full pl-10 py-3 border rounded-xl" />
                  </div>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-xl">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" />
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required className="w-full pl-10 py-3 border rounded-xl" />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="w-full pl-10 py-3 border rounded-xl" />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="w-full pl-10 pr-10 py-3 border rounded-xl" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {mode === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" />
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full pl-10 pr-10 py-3 border rounded-xl" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400">
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start space-x-3">
                <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} required className="mt-1 w-4 h-4" />
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 underline">Terms</a> and{' '}
                  <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
                </label>
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right text-sm">
                <a href="#" className="text-blue-600">Forgot Password?</a>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{mode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button type="button" className="border border-gray-300 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-50">
              Google
            </button>
            <button type="button" className="border border-gray-300 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-50">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
