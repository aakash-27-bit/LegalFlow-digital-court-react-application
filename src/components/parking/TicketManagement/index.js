import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationHeader from '../../../shared/Navigation/NavigationHeader';
import { DEFAULT_TICKETS } from '../../../constants/PMS_CONSTANTS/defaultTickets';
import { IoRefreshOutline } from 'react-icons/io5';
// import NavigationArrow from '../../../components/shared/UIelements/NavigationArrow';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [userType, setUserType] = useState('guest'); // 'employee' or 'guest'
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    status: 'all',
    type: 'all'
  });

  const refreshData = () => {
    setLoading(true);
    try {
      if (userType === 'guest') {
        const storedDrivers = JSON.parse(localStorage.getItem('parkingDrivers') || '[]');
        setTickets([...DEFAULT_TICKETS, ...storedDrivers]);
      } else {
        const storedTickets = JSON.parse(localStorage.getItem('parkingTickets') || '[]');
        setTickets(storedTickets);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, [userType]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderTicketTable = () => {
    if (userType === 'employee') {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.driverName}</td>
                <td className="px-6 py-4">{ticket.vehicleNumber}</td>
                <td className="px-6 py-4">{ticket.licenseNumber}</td>
                <td className="px-6 py-4">{ticket.contactNumber}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4">{ticket.vehicleNumber}</td>
                <td className="px-6 py-4">{ticket.licenseNumber}</td>
                <td className="px-6 py-4">{ticket.contactNumber}</td>
                <td className="px-6 py-4">{ticket.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="px-6 py-4 whitespace-nowrap">{ticket.id}</td>
              <td className="px-6 py-4">{ticket.vehicleNumber}</td>
              <td className="px-6 py-4">{ticket.driverName}</td>
              <td className="px-6 py-4">{ticket.contactNumber}</td>
              <td className="px-6 py-4">{ticket.licenseNumber}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  ticket.status === 'paid' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {ticket.status !== 'paid' && (
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => {/* Handle payment */}}
                  >
                    Pay Now
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6">
      <NavigationHeader currentStep="Ticket Management" />
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Ticket Management</h1>
          <button
            onClick={refreshData}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Refresh Data"
          >
            <IoRefreshOutline className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex gap-4">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="guest">Guest View</option>
            <option value="employee">Employee View</option>
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            className="px-4 py-2 border rounded-md"
          />

          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          renderTicketTable()
        )}
      </div>
    </div>
  );
};

export default TicketManagement;
