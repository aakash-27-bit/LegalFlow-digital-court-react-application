import React, { useState } from 'react';
import VehicleList from './VehicleList';

const VehicleMonitoring = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Vehicle Monitoring</h1>
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Vehicles</option>
            <option value="parked">Currently Parked</option>
            <option value="exited">Exited</option>
          </select>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
      <VehicleList filter={filterStatus} />
    </div>
  );
};

export default VehicleMonitoring;
