
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../store/loginSlice";
import ErrorModal from "../../shared/modals/ErrorModal";
import LoadingSpinner from "../../shared/UIelements/LoadingSpinner";
import './auth.styles.css';
import logo from '../../assets/revamp/generated-image-logo.png';
import bgLogo from '../../assets/law justice.jpg';
import axios from "axios";
const Authenticate = () => {
  const dispatch = useDispatch();
  // Use localStorage for login state
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  // Redirect to /dashboard if already logged in (on reload or navigation)
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
    // Listen for popstate (back/forward navigation)
    const handlePopState = () => {
      if (!!localStorage.getItem('Access-token')) {
        navigate('/dashboard', { replace: true });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoggedIn, navigate]);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    addressState: '',
    addressDistrict: '',
    remember: false,
  });

  // Redirect to /dashboard if already logged in (on reload or navigation)
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
    // Listen for popstate (back/forward navigation)
    const handlePopState = () => {
      if (!!localStorage.getItem('Access-token')) {
        navigate('/dashboard', { replace: true });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ...existing code...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLogin) {
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL || '';
        const response = await axios.post(
          `${baseUrl}/ccms/user/login`,
          {
            email: formState.email,
            password: formState.password,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setIsLoading(false);
        const { token } = response.data;
        localStorage.setItem('Access-token', JSON.stringify(token));
        localStorage.setItem('isLoggedIn', 'true'); // <-- Add this line
        window.location.replace('/dashboard');
        dispatch(
          login({
            userId: response.data.user.id,
            userName: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role || 'USER',
          })
        );
      } catch (err) {
        setIsLoading(false);
        setError(err.response?.data?.message || err.message);
      }
    } else {
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL || '';
        const response = await axios.post(
          `${baseUrl}/ccms/user/signup`,
          {
            fullName: formState.fullName,
            email: formState.email,
            password: formState.password,
            phone: formState.phone,
            addressState: formState.addressState,
            addressDistrict: formState.addressDistrict,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setIsLoading(false);
        const { token } = response.data;
        localStorage.setItem('Access-token', token);
        localStorage.setItem('isLoggedIn', 'true'); // <-- Add this line
        window.location.replace('/dashboard');
        dispatch(
          login({
            userId: response.data.user.id,
            userName: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role || 'user',
          })
        );
      } catch (err) {
        setIsLoading(false);
        setError(err.response?.data?.message || err.message);
      }
    }
  };
  // ...existing code...

  const clearError = () => setError(null);

  return (
    <div className="auth-bg">
      <div className="auth-logo">
        <img src={logo} alt="Logo" className="auth-logo-img" />
      </div>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <form className={`auth-card${!isLogin ? ' signup-mode' : ''}`} onSubmit={handleSubmit} autoComplete="off">
        <div className="auth-title">
          {isLogin ? 'Hi, Welcome Back' : 'Get Started with HighWheels'}
        </div>
        <div className="auth-subtitle">
          {isLogin
            ? 'Log in to maximize your e-court experience.'
            : `Let's take your legal workflow to new heights`}
        </div>

        {!isLogin && (
          <>
            <label className="auth-label" htmlFor="fullName">Full Name</label>
            <input
              className="auth-input"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              value={formState.fullName}
              onChange={handleInputChange}
              autoComplete="name"
            />
            <label className="auth-label" htmlFor="phone">Phone Number</label>
            <input
              className="auth-input"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              value={formState.phone}
              onChange={handleInputChange}
              autoComplete="tel"
            />
            <label className="auth-label" htmlFor="addressState">State</label>
            <input
              className="auth-input"
              type="text"
              name="addressState"
              id="addressState"
              placeholder="State"
              value={formState.addressState}
              onChange={handleInputChange}
              autoComplete="address-level1"
            />
            <label className="auth-label" htmlFor="addressDistrict">District</label>
            <input
              className="auth-input"
              type="text"
              name="addressDistrict"
              id="addressDistrict"
              placeholder="District"
              value={formState.addressDistrict}
              onChange={handleInputChange}
              autoComplete="address-level2"
            />
          </>
        )}
        <label className="auth-label" htmlFor="email">Email</label>
        <input
          className="auth-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          value={formState.email}
          onChange={handleInputChange}
          autoComplete="email"
        />
        <label className="auth-label" htmlFor="password">Password</label>
        <input
          className="auth-input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleInputChange}
          autoComplete="current-password"
        />
        {isLogin && (
          <div className="auth-row">
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: 400, fontSize: '0.98rem' }}>
              <input
                type="checkbox"
                className="auth-checkbox"
                name="remember"
                checked={formState.remember}
                onChange={handleInputChange}
              />
              Remember me
            </label>
            <span className="auth-link" style={{ marginLeft: 'auto' }}>Forgot Password?</span>
          </div>
        )}
        <button className="auth-btn" type="submit">
          {isLogin ? 'Log in' : 'Sign up'}
        </button>
      </form>
      <div className="auth-footer" style={{ marginBottom: 18 }}>
        {isLogin ? (
          <>
            Don't have an account?
            <span className="auth-link" onClick={() => setIsLogin(false)}> Sign up</span>
          </>
        ) : (
          <>
            Already have an account?
            <span className="auth-link" onClick={() => setIsLogin(true)}> Log in</span>
          </>
        )}
      </div>
      <div className="auth-bg-illus">
        {/* You can add a background illustration image here if desired */}
        <img src={bgLogo} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default Authenticate;
