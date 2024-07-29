import React, { useState } from 'react';
import StaffForm from './StaffForm';
import './StaffList.css';

const initialStaff = [
  { id: 1, name: 'John Doe', position: 'Manager', contact: '123-456-7890', email: 'john@example.com' }
];

function StaffList() {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');

  const addStaffMember = (newMember) => {
    const isDuplicate = staff.some(member => member.email === newMember.email);
    if (isDuplicate) {
      alert('A staff member with the same email already exists.');
      return;
    }
    setStaff([...staff, { ...newMember, id: staff.length + 1 }]);
  };

  const deleteStaffMember = (id) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="staff-list">
      <center><h2>Employee Members</h2></center>
      <ul>
        {filteredStaff.map(member => (
          <li key={member.id} className="staff-item">
            <div>
              <strong>{member.name}</strong> - {member.position} ({member.contact}, {member.email})
            </div>
            <div>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn" onClick={() => deleteStaffMember(member.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <StaffForm addStaffMember={addStaffMember} />
    </div>
  );
}

export default StaffList;
