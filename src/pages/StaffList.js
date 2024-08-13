import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffForm from './StaffForm';
import './StaffList.css';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3001/staff');
        console.log('Fetched staff data:', response.data); // Debugging line
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error.response ? error.response.data : error.message);
      }
    };

    fetchStaff();
  }, []);

  const addStaffMember = async (newMember) => {
    const isValid = newMember.name && newMember.contactnumber && newMember.position && newMember.user_email;
    if (!isValid) {
      alert('Please fill all required fields.');
      return;
    }
  
    const isDuplicate = staff.some(member => member.user_email === newMember.user_email);
    if (isDuplicate) {
      alert('A staff member with the same email already exists.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/staff', newMember);
      console.log('Staff member added:', response.data); // Debugging line
      setStaff(prevStaff => [...prevStaff, response.data]);
    } catch (error) {
      console.error('Error adding staff member:', error.response ? error.response.data : error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  const deleteStaffMember = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/staff/${id}`);
      setStaff(prevStaff => prevStaff.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting staff member:', error.response ? error.response.data : error.message);
    }
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
      <input
        type="text"
        placeholder="Search by name or position"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul>
        {filteredStaff.map(member => (
          <li key={member.id} className="staff-item">
            <div>
              <strong>{member.name}</strong> - {member.position} ({member.contactnumber}, {member.user_email})
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
