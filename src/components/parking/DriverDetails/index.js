import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationArrow from '../../../components/shared/UIelements/NavigationArrow';

const navigationRoutes = [
  { path: '/driver-details', label: 'Driver Details' },
  { path: '/ticket-management', label: 'Ticket Management' },
  { path: '/vehicle-monitoring', label: 'Vehicle Monitoring' }
];

const DriverDetails = () => {
  const navigate = useNavigate();
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
      const ticketPayload = {
        vehicleNumber: formData.vehicleNumber,
        //driverId: driverResponse.data.driverId, // Assuming the API returns driverId
        type: 'registration',
        status: 'pending',
        notes: `New vehicle registration for ${formData.driverName}`,
        violations: ['New Registration'],
        amount: 0 // Or any registration fee if applicable
      };

      // Store in localStorage
      const existingDrivers = JSON.parse(localStorage.getItem('parkingDrivers') || '[]');
      const existingTickets = JSON.parse(localStorage.getItem('parkingTickets') || '[]');

      const newDriver = {
        id: Date.now().toString(),
        ...formData,
        licenseImage: formData.licenseImage ? URL.createObjectURL(formData.licenseImage) : null,
        createdAt: new Date().toISOString()
      };

      const newTicket = {
        id: `TKT-${Date.now()}`,
        ...ticketPayload,
        driverId: newDriver.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('parkingDrivers', JSON.stringify([...existingDrivers, newDriver]));
      localStorage.setItem('parkingTickets', JSON.stringify([...existingTickets, newTicket]));

      setFormData({
        driverName: '',
        licenseNumber: '',
        licenseImage: null,
        vehicleNumber: '',
        contactNumber: ''
      });
      // Redirect to ticket management page after successful submission
      navigate('/ticket-management');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <NavigationArrow routes={navigationRoutes} />
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
