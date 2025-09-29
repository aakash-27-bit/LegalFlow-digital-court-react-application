import React from 'react';

const VehicleCard = ({ vehicle, onDetailsClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{vehicle.number}</h3>
          <p className="text-gray-600 text-sm">Slot: {vehicle.parkingSlot}</p>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(vehicle.entryTime).toLocaleTimeString()}
        </span>
      </div>

      <div className="space-y-2">
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
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onDetailsClick}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
