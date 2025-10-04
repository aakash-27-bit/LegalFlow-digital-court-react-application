import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle, onDetailsClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAvailableClick = (e) => {
    e.stopPropagation(); // Prevent card expansion when clicking button
    navigate('/new-registration');
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 transition-all duration-300 cursor-pointer 
        ${isExpanded ? 'shadow-xl scale-105' : 'hover:shadow-lg'}`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{vehicle.number}</h3>
          <p className="text-gray-600 text-sm">Slot: {vehicle.parkingSlot}</p>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(vehicle.entryTime).toLocaleTimeString()}
        </span>
      </div>

      <div className={`space-y-2 ${isExpanded ? 'block' : 'hidden'}`}>
        {vehicle.brand && (
          <div className="flex justify-between">
            <span className="text-gray-600">Brand:</span>
            <span>{vehicle.brand}</span>
          </div>
        )}
        {vehicle.model && (
          <div className="flex justify-between">
            <span className="text-gray-600">Model:</span>
            <span>{vehicle.model}</span>
          </div>
        )}
        {vehicle.color && (
          <div className="flex justify-between">
            <span className="text-gray-600">Color:</span>
            <span>{vehicle.color}</span>
          </div>
        )}
        {vehicle.driverName && (
          <div className="flex justify-between">
            <span className="text-gray-600">Driver:</span>
            <span>{vehicle.driverName}</span>
          </div>
        )}
        {vehicle.contactNumber && (
          <div className="flex justify-between">
            <span className="text-gray-600">Contact:</span>
            <span>{vehicle.contactNumber}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${vehicle.status === 'available' ? 'text-green-600' : 'text-blue-600'
            }`}>
            {vehicle.status}
          </span>
        </div>
      </div>

      <div className={`mt-4 flex justify-end gap-2 ${isExpanded ? 'block' : 'hidden'}`}>
        {vehicle.status === 'available' ? (
          <button
            onClick={handleAvailableClick}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Available
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick && onDetailsClick(vehicle);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
