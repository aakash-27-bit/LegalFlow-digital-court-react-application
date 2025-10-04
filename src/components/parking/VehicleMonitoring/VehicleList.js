import React from 'react';
import VehicleCard from './VehicleCard';
import { VEHICLE_LIST } from '../../../constants/PMS_CONSTANTS/vehicleList';

const VehicleList = ({ filter = 'all' }) => {
  const filteredVehicles = VEHICLE_LIST.filter(vehicle => {
    if (filter === 'all') return true;
    if (filter === 'parked') return vehicle.status === 'parked';
    if (filter === 'exited') return vehicle.status === 'exited';
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
        />
      ))}
    </div>
  );
};

export default VehicleList;
