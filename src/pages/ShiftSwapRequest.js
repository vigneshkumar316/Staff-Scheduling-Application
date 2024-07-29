import React, { useState } from 'react';

const ShiftSwapRequest = () => {
  const [yourShift, setYourShift] = useState('');
  const [colleagueShift, setColleagueShift] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit swap request
  };

  return (
    <div>
      <h2>Request Shift Swap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your Shift:</label>
          <input type="text" value={yourShift} onChange={(e) => setYourShift(e.target.value)} required />
        </div>
        <div>
          <label>Colleague's Shift:</label>
          <input type="text" value={colleagueShift} onChange={(e) => setColleagueShift(e.target.value)} required />
        </div>
        <div>
          <label>Reason:</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <button type="submit">Submit Swap Request</button>
      </form>
    </div>
  );
};

export default ShiftSwapRequest;
