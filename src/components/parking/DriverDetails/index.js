import React, { useState } from 'react';
import axios from 'axios';

const DriverDetails = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    licenseNumber: '',
    licenseImage: null,
    vehicleNumber: '',
    contactNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      licenseImage: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formPayload = new FormData();
    Object.keys(formData).forEach(key => {
      formPayload.append(key, formData[key]);
    });

    try {
      const token = localStorage.getItem('Access-token');
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/parking/driver`,
        formPayload,
        {
          headers: {
            ...token ? { Authorization: `Bearer ${token}` } : {},
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setFormData({
        driverName: '',
        licenseNumber: '',
        licenseImage: null,
        vehicleNumber: '',
        contactNumber: ''
      });
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Driver Details</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Driver Name</label>
          <input
            type="text"
            name="driverName"
            value={formData.driverName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">License Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? 'Saving...' : 'Save Details'}
        </button>
      </form>
    </div>
  );
};

export default DriverDetails;
