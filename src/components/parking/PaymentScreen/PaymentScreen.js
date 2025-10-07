import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {};
  const amount = 1; // Default amount Rs. 1

  const initializeRazorpay = async () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100, // Razorpay takes amount in paise
      currency: "INR",
      name: "HighWheels Parking",
      description: `Payment for ticket ${ticket?.id}`,
      order_id: "", // This will come from your backend
      handler: function (response) {
        // Handle success
        console.log(response);
        handlePaymentSuccess(response);
      },
      prefill: {
        name: ticket?.driverName,
        contact: ticket?.contactNumber,
      },
      theme: {
        color: "#3D74B6"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // Update ticket status in localStorage
      const tickets = JSON.parse(localStorage.getItem('parkingTickets') || '[]');
      const updatedTickets = tickets.map(t => 
        t.id === ticket.id ? { ...t, status: 'paid' } : t
      );
      localStorage.setItem('parkingTickets', JSON.stringify(updatedTickets));
      
      navigate('/ticket-management');
    } catch (error) {
      console.error('Payment verification failed:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Payment for Ticket {ticket?.id}</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <p className="text-gray-600">Amount to pay:</p>
          <p className="text-2xl font-bold">₹{amount}</p>
        </div>
        <button
          onClick={initializeRazorpay}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
