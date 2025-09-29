import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCard';
import axios from 'axios';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('Access-token');
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/parking/vehicles`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setVehicles(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  const fetchVehicleDetails = async (vehicleNumber) => {
    try {
      // Integrate with third-party API to get vehicle details
      const response = await axios.get(
        `${process.env.REACT_APP_VEHICLE_API_URL}/${vehicleNumber}`
      );
      return response.data;
    } catch (err) {
      console.error('Error fetching vehicle details:', err);
      return null;
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onDetailsClick={() => fetchVehicleDetails(vehicle.number)}
        />
      ))}
    </div>
  );
};

export default VehicleList;
