import React, { useState } from 'react';
import './StaffForm.css';

function StaffForm({ addStaffMember }) {
  const [formData, setFormData] = useState({ name: '', contactnumber: '', position: '', user_email: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccessMessage('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.position) errors.position = "Position is required";
    if (!formData.contactnumber) errors.contactnumber = "Contact number is required";
    if (!formData.user_email) errors.user_email = "Email is required";
    if (formData.user_email && !/\S+@\S+\.\S+/.test(formData.user_email)) errors.user_email = "Email is invalid";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addStaffMember(formData);
    setFormData({ name: '', contactnumber: '', position: '', user_email: '' });
    setSuccessMessage('Staff member added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="staff-form">
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label>Contact Number</label>
        <input type="text" name="contactnumber" value={formData.contactnumber} onChange={handleChange} placeholder="Contact Number" required />
        {errors.contactnumber && <span className="error">{errors.contactnumber}</span>}
      </div>
      <div className="form-group">
        <label>Position</label>
        <select name="position" value={formData.position} onChange={handleChange} required>
          <option value="">Select Position</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Editor">Editor</option>
        </select>
        {errors.position && <span className="error">{errors.position}</span>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} placeholder="Email" required />
        {errors.user_email && <span className="error">{errors.user_email}</span>}
      </div>
      <center><button type="submit">Add Staff</button></center>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default StaffForm;
