import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../../shared/Navigation/NavigationHeader';
import NavigationArrow from '../../../components/shared/UIelements/NavigationArrow';
import VehicleList from './VehicleList';
import { MONITORING_DATA } from '../../../constants/PMS_CONSTANTS/vehicleMonitoringData';
import { IoRefreshOutline } from 'react-icons/io5';

const navigationRoutes = [
  { path: '/driver-details', label: 'Driver Details' },
  { path: '/ticket-management', label: 'Ticket Management' },
  { path: '/vehicle-monitoring', label: 'Vehicle Monitoring' }
];

const VehicleMonitoring = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const loadVehicleData = () => {
    try {
      const driverData = JSON.parse(localStorage.getItem('driverData'));
      if (driverData) {
        const formattedData = {
          id: driverData.id,
          driverName: driverData.driverName,
          vehicleNumber: driverData.vehicleNumber,
          contactNumber: driverData.contactNumber,
          licenseNumber: driverData.licenseNumber,
          licenseImage: driverData.licenseImage,
          createdAt: driverData.createdAt,
          status: 'parked',
          type: 'Car',
          parkingSpot: localStorage.getItem('selectedParkingSpot') ?
            JSON.parse(localStorage.getItem('selectedParkingSpot')).spotNumber : 'A1'
        };
        setVehicleData([formattedData, ...MONITORING_DATA]);
      } else {
        setVehicleData(MONITORING_DATA);
      }
    } catch (error) {
      console.error('Error loading vehicle data:', error);
      setVehicleData(MONITORING_DATA);
    }
  };

  useEffect(() => {
    loadVehicleData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      loadVehicleData();
    } catch (error) { console.error('Error refreshing data:', error); }
    setIsRefreshing(false);
  };

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
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
          >
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <IoRefreshOutline className="w-4 h-4" />
                <span>Refresh</span>
              </>
            )}
          </button>
        </div>
      </div>
      <VehicleList
        filter={filterStatus}
        vehicles={vehicleData}
        isRefreshing={isRefreshing}
      />
    </div>
  );
};

export default VehicleMonitoring;
