import React, { useState, useRef } from 'react';
import { Bus, Save, ArrowLeft, ImagePlus } from 'lucide-react';
import { createpathThunk } from '../../../../features/booking/createpath/CreatepathThunk';
import{useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {toast} from 'react-toastify'
import { refreshdata } from '../../../../features/booking/createpath/CreatepathSlice';
const CreateBus = () => {
  const [formData, setFormData] = useState({
    Name: '',
    category: 'Standard',
    date: '',
    from: '',
    to: '',
    timeFrom: '',
    timeTo: '',
    timetravel: '',
    wifi: false,
    chargingpoint: false,
    blanket: false,
    waterbottle: false,
    price: '',
    totalseat: 30,
    plateNumber:''
  });

  const [images, setImages] = useState([]);
  const imageInputRef = useRef(null);
const dispatch=useDispatch()
const {status,message}= useSelector((state)=>state.createpath)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleImageRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((img, index) => {
      data.append('images', img); // name "images" should match your backend field
    });
    

    dispatch(createpathThunk(data))
    // Reset form
    setFormData({
      Name: '',
      category: 'Standard',
      date: '',
      from: '',
      to: '',
      timeFrom: '',
      timeTo: '',
      timetravel: '',
      wifi: false,
      chargingpoint: false,
      blanket: false,
      waterbottle: false,
      price: '',
      totalseat: 30,
      plateNumber:''
    });
    setImages([]);
  };

  useEffect(()=>{
if(status === 'success'){
  toast.success(message)
   dispatch(refreshdata())
}
  },[dispatch,message])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Bus Travel Path</h1>
        <p className="text-gray-600">Fill in the details to register a new bus route.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="Name" value={formData.Name} onChange={handleChange} placeholder="Bus Name" className="p-3 border rounded-lg" required />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="p-3 border rounded-lg" />
            <input name="plateNumber" value={formData.plateNumber} onChange={handleChange} placeholder="plateNumber" className="p-3 border rounded-lg" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-3 border rounded-lg" required />
          <input name="from" value={formData.from} onChange={handleChange} placeholder="From" className="p-3 border rounded-lg" required />
          <input name="to" value={formData.to} onChange={handleChange} placeholder="To" className="p-3 border rounded-lg" required />
          <input name="timeFrom" value={formData.timeFrom} onChange={handleChange} placeholder="Departure Time" className="p-3 border rounded-lg" required />
          <input name="timeTo" value={formData.timeTo} onChange={handleChange} placeholder="Arrival Time" className="p-3 border rounded-lg" required />
          <input name="timetravel" value={formData.timetravel} onChange={handleChange} placeholder="Duration (e.g., 5h)" className="p-3 border rounded-lg" />
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" className="p-3 border rounded-lg" required />
          <input name="totalseat" value={formData.totalseat} onChange={handleChange} type="number" placeholder="Total Seats" className="p-3 border rounded-lg" min="1" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleChange} />
            <span>WiFi</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="chargingpoint" checked={formData.chargingpoint} onChange={handleChange} />
            <span>Charging Point</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="blanket" checked={formData.blanket} onChange={handleChange} />
            <span>Blanket</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="waterbottle" checked={formData.waterbottle} onChange={handleChange} />
            <span>Water Bottle</span>
          </label>
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Bus Images</p>
          <button
            type="button"
            onClick={() => imageInputRef.current.click()}
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
          >
            <ImagePlus className="w-5 h-5 mr-2" /> Upload Images
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
          {images.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={URL.createObjectURL(img)} alt="preview" className="rounded-lg w-full h-24 object-cover" />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="bg-gray-300 px-5 py-2 rounded-lg flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2 disabled:bg-blue-400" disabled={status === 'pending'}>
            <Save className="w-5 h-5" />
            <span>Create</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBus;
