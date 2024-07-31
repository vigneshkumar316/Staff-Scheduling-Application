import React, { useState } from 'react';
import './ShiftForm.css';

function ShiftForm({ addShift }) {
  const [formData, setFormData] = useState({ date: '', type: '', staffNeeded: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
    setSuccessMessage(''); // Clear success message on change
  };

  const validate = () => {
    const errors = {};
    if (!formData.date) errors.date = "Date is required";
    if (!formData.type) errors.type = "Shift type is required";
    if (!formData.staffNeeded || formData.staffNeeded <= 0) errors.staffNeeded = "Valid staff number is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addShift(formData);
    setFormData({ date: '', type: '', staffNeeded: '' });
    setSuccessMessage('Shift added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="shift-form">
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="type">Shift Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Shift Type</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
        {errors.type && <span className="error">{errors.type}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="staffNeeded">Staff Needed</label>
        <input
          type="number"
          id="staffNeeded"
          name="staffNeeded"
          value={formData.staffNeeded}
          onChange={handleChange}
          min="1"
          required
        />
        {errors.staffNeeded && <span className="error">{errors.staffNeeded}</span>}
      </div>
      <center><button type="submit">Add Shift</button></center>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default ShiftForm;
