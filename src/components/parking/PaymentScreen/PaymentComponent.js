import { useEffect } from 'react';

const PaymentComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup the script on unmount
    };
  }, []);

  const initializeRazorpay = () => {
    if (window.Razorpay) {
      const razorpay = new window.Razorpay({
        key: 'YOUR_RAZORPAY_KEY',
        amount: 50000,
        currency: 'INR',
        name: 'Test Shop',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo.png',
        handler: function (response) {
          alert('Payment successful!');
        },
      });
      razorpay.open();
    } else {
     // console.error('Razorpay not loaded');
    }
  };

  return (
    <button onClick={initializeRazorpay}>
      Pay with Razorpay
    </button>
  );
};

export default PaymentComponent;
