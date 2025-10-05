import React, { useState } from 'react';
import { useData } from '../contexts/DataProvider';
import DragAndDropBuilder from './DragAndDropBuilder';

const InteractiveDashboard = () => {
  const { parkingData, loading, error } = useData();
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetrics, setSelectedMetrics] = useState(['occupancy', 'turnover']);

  const timeRanges = {
    '24h': 'Last 24 Hours',
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 90 Days'
  };

  const metrics = {
    occupancy: 'Occupancy Rate',
    turnover: 'Turnover Rate',
    duration: 'Average Duration',
    revenue: 'Revenue',
    violations: 'Violations'
  };

  const chartData = {
    labels: parkingData.historicalData.map(d => new Date(d.timestamp).toLocaleTimeString()),
    values: parkingData.historicalData.map(d => d.occupancyRate)
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Parking Analytics Dashboard</h2>
          <p className="text-gray-600">Real-time monitoring and analysis</p>
        </div>

        <div className="flex gap-4">
          {/* Time Range Filter */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(timeRanges).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Metrics Filter */}
          <div className="flex gap-2">
            {Object.entries(metrics).map(([key, label]) => (
              <label key={key} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMetrics([...selectedMetrics, key]);
                    } else {
                      setSelectedMetrics(selectedMetrics.filter(m => m !== key));
                    }
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Spots</h3>
          <p className="text-2xl font-semibold">{parkingData.analytics.totalSpots}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Occupied Spots</h3>
          <p className="text-2xl font-semibold">{parkingData.analytics.occupiedSpots}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Available Spots</h3>
          <p className="text-2xl font-semibold">{parkingData.analytics.availableSpots}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Occupancy Rate</h3>
          <p className="text-2xl font-semibold">
            {parkingData.analytics.occupancyRate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Drag and Drop Chart Builder */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <DragAndDropBuilder data={chartData} />
      )}

      {/* Peak Hours Analysis */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Peak Hours Analysis</h3>
        <div className="space-y-2">
          {parkingData.analytics.peakHours.map((peak, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{`${peak.hour}:00`}</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 rounded-full h-4"
                  style={{ width: `${peak.averageOccupancy}%` }}
                ></div>
              </div>
              <span>{peak.averageOccupancy.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Weekly Trends</h3>
        <div className="space-y-2">
          {parkingData.analytics.trends.map((trend, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="w-24">{trend.day}</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 rounded-full h-4"
                  style={{ width: `${trend.averageOccupancy}%` }}
                ></div>
              </div>
              <span>{trend.averageOccupancy.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboard;
