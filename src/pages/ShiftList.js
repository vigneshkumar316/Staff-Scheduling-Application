import React, { useState } from 'react';
import ShiftForm from './ShiftForm';
import './ShiftList.css';

const initialShifts = [
  { id: 1, date: '2024-07-28', type: 'Morning', staffNeeded: 3 }
];

function ShiftList() {
  const [shifts, setShifts] = useState(initialShifts);
  const [sortOrder, setSortOrder] = useState('asc'); // For sorting

  const addShift = (newShift) => {
    const isDuplicate = shifts.some(shift => shift.date === newShift.date && shift.type === newShift.type);
    if (isDuplicate) {
      alert('A shift with the same date and type already exists.');
      return;
    }
    setShifts([...shifts, { ...newShift, id: shifts.length + 1 }]);
  };

  const deleteShift = (id) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  const sortShifts = () => {
    const sortedShifts = [...shifts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setShifts(sortedShifts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="shift-list">
      <div className="shift-list-container">
        <center><h2>Shift Schedule</h2></center>
        <button onClick={sortShifts} className="sort-btn">
          Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        <ul>
          {shifts.map(shift => (
            <li key={shift.id} className="shift-item">
              <div>
                <strong>Date:</strong> {shift.date} <br />
                <strong>Type:</strong> {shift.type} <br />
                <strong>Staff Needed:</strong> {shift.staffNeeded}
              </div>
              <button onClick={() => deleteShift(shift.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
        <ShiftForm addShift={addShift} />
      </div>
    </div>
  );
}

export default ShiftList;
