import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.get('http://localhost:3031/users');
      const existingUsers = response.data;
      const userExists = existingUsers.some(user => user.email === formData.email);
  
      if (userExists) {
        setError('User already exists');
        toast.error('User already exists');
        return;
      }
  
      await axios.post('http://localhost:3031/users', formData);
      toast.success('Registration successful');
      
      // Delay redirect to allow toast to be visible
      setTimeout(() => {
        navigate('/login');
      }, 100); // Adjust the delay as needed
    } catch (err) {
      setError('An error occurred during registration');
      toast.error('An error occurred during registration');
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p className="redirect-message">Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
