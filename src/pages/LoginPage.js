// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Local state for authentication status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your login logic (e.g., API call)
    // Assuming a successful login:
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className="redirect-message">Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;