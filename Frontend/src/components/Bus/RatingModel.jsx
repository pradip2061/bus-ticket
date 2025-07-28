import React, { useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios'
import {toast} from 'react-toastify'
import{useDispatch} from 'react-redux'
import { getpathThunk } from '../../../features/booking/getpathdata/getpathThunk';
const RatingModel = ({ busName, onClose, onSubmit,busid }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState('');
  const[loading,setLoading]=useState(false)
  const dispatch =useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (rating > 0) {
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ratebus`,{review,rating,busid},{
      withCredentials:true
    })
    if(response.status === 200){
      const data = localStorage.getItem("pathdata");
      const pathdata=JSON.parse(data)
      toast.success(response.data.message)
      dispatch(getpathThunk(pathdata))
    }
    }
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
       onClose()
    }
  };

  
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-inner">
        <h2 className="text-xl font-semibold mb-4 text-center">Rate Your Experience</h2>
        <p className="text-center mb-4">How was your journey with <strong>{busName}</strong>?</p>

        {/* Star Rating */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              className={`w-6 h-6 cursor-pointer transition ${
                (hovered || rating) >= num ? 'text-yellow-500' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHovered(num)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(num)}
              fill={(hovered || rating) >= num ? '#facc15' : 'none'}
            />
          ))}
        </div>

        {/* Textarea */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Share your experience (optional)
        </label>
        <textarea
          placeholder="Tell others about your journey..."
          className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white transition ${
              rating > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
            disabled={rating === 0 && loading}
          >
            {loading ?"Submitting Rating..":"Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModel;
