import React, { useState } from 'react';
import NavigationHeader from '../../../shared/Navigation/NavigationHeader';
import NavigationArrow from '../../../components/shared/UIelements/NavigationArrow';
import VehicleList from './VehicleList';
import { MONITORING_DATA } from '../../../constants/PMS_CONSTANTS/vehicleMonitoringData';
import { IoRefreshOutline, IoWarningOutline } from 'react-icons/io5';
import { BsCheckCircle } from 'react-icons/bs';

const navigationRoutes = [
  { path: '/driver-details', label: 'Driver Details' },
  { path: '/ticket-management', label: 'Ticket Management' },
  { path: '/vehicle-monitoring', label: 'Vehicle Monitoring' }
];

const VehicleMonitoring = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  return (
    <div className="p-6">
      <NavigationHeader currentStep="Vehicle Monitoring" />
      <NavigationArrow routes={navigationRoutes} />
      <div className="flex justify-between items-center mb-6">
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
