import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [parkingData, setParkingData] = useState({
    realTimeOccupancy: [],
    historicalData: [],
    analytics: {
      totalSpots: 0,
      occupiedSpots: 0,
      availableSpots: 0,
      occupancyRate: 0,
      peakHours: [],
      trends: []
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = io(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8080');

    socket.on('connect', () => {
      console.log('Connected to real-time data server');
      setError(null);
    });

    socket.on('parkingUpdate', (data) => {
      setParkingData(prevData => ({
        ...prevData,
        realTimeOccupancy: data.realTimeData,
        analytics: {
          ...prevData.analytics,
          totalSpots: data.totalSpots,
          occupiedSpots: data.occupiedSpots,
          availableSpots: data.availableSpots,
          occupancyRate: (data.occupiedSpots / data.totalSpots) * 100
        }
      }));
      setLoading(false);
    });

    socket.on('error', (err) => {
      console.error('WebSocket error:', err);
      setError('Failed to connect to real-time data server');
      setLoading(false);
    });

    // Fetch historical data
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch('/api/parking/historical');
        const data = await response.json();
        setParkingData(prevData => ({
          ...prevData,
          historicalData: data
        }));
      } catch (err) {
        console.error('Error fetching historical data:', err);
        setError('Failed to fetch historical data');
      }
    };

    fetchHistoricalData();

    // Cleanup function
    return () => {
      socket.disconnect();
    };
  }, []);

  // Analytics calculations
  useEffect(() => {
    if (parkingData.historicalData.length > 0) {
      // Calculate peak hours
      const peakHours = calculatePeakHours(parkingData.historicalData);
      
      // Calculate trends
      const trends = calculateTrends(parkingData.historicalData);

      setParkingData(prevData => ({
        ...prevData,
        analytics: {
          ...prevData.analytics,
          peakHours,
          trends
        }
      }));
    }
  }, [parkingData.historicalData]);

  const calculatePeakHours = (data) => {
    // Group data by hour and calculate average occupancy
    const hourlyOccupancy = data.reduce((acc, record) => {
      const hour = new Date(record.timestamp).getHours();
      if (!acc[hour]) {
        acc[hour] = { total: 0, count: 0 };
      }
      acc[hour].total += record.occupancyRate;
      acc[hour].count += 1;
      return acc;
    }, {});

    // Convert to array and sort by average occupancy
    return Object.entries(hourlyOccupancy)
      .map(([hour, data]) => ({
        hour: parseInt(hour),
        averageOccupancy: data.total / data.count
      }))
      .sort((a, b) => b.averageOccupancy - a.averageOccupancy)
      .slice(0, 5); // Top 5 peak hours
  };

  const calculateTrends = (data) => {
    // Calculate weekly trends
    const weeklyData = data.reduce((acc, record) => {
      const date = new Date(record.timestamp);
      const day = date.getDay();
      if (!acc[day]) {
        acc[day] = { total: 0, count: 0 };
      }
      acc[day].total += record.occupancyRate;
      acc[day].count += 1;
      return acc;
    }, {});

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays.map((day, index) => ({
      day,
      averageOccupancy: weeklyData[index] 
        ? weeklyData[index].total / weeklyData[index].count 
        : 0
    }));
  };

  return (
    <DataContext.Provider value={{ parkingData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
