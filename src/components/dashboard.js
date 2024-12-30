import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
import '../App.css'
import { useNavigate } from 'react-router-dom';

const WaterIntakeList = () => {
  const [waterIntake, setWaterIntake] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [intakeDifference, setIntakeDifference] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status and redirect if not logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    if (!loggedInStatus) {
      navigate('/'); // Redirect to home page if not logged in
    }
    setIsLoggedIn(loggedInStatus);
  }, [navigate]);

  // Load user data (including water intake) from localStorage on component mount
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedInEmail);
  
    if (userIndex !== -1) {
      const user = users[userIndex];
  
      // Ensure the latest user is saved in localStorage (this is optional if you're already doing it)
      localStorage.setItem('user', JSON.stringify(user));
  
      // Set the water intake from the latest user
      if (user.waterIntake) {
        setWaterIntake(user.waterIntake);
      }
    }
  }, []);
  

  // Pagination calculations
  const itemsPerPage = 1; // Adjust as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = waterIntake.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(waterIntake.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete water intake entry
  const handleDelete = (index) => {
    const updatedWaterIntake = waterIntake.filter((_, i) => i !== index);
    setWaterIntake(updatedWaterIntake);
    
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedInEmail);
  
    if (userIndex !== -1) {
      // Retrieve the user and update the waterIntake
      const user = users[userIndex];
      user.waterIntake = updatedWaterIntake;  // Update the waterIntake for the logged-in user
  
      // Store the updated user back to localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Update the users array in localStorage with the updated user data
      users[userIndex] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  // Handle edit button click
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValue(waterIntake[index].quantity);
    setShowModal(true);
  };

  // Handle saving edited value
  const handleSaveEdit = () => {
    // Create a copy of waterIntake and update the value
    const updatedWaterIntake = [...waterIntake];
    updatedWaterIntake[editIndex].quantity = editValue;
  
    // Update the state with the new water intake
    setWaterIntake(updatedWaterIntake);
  
    // Retrieve the current logged-in user from localStorage
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedInEmail);
  
    if (userIndex !== -1) {
      // Retrieve the user and update the waterIntake
      const user = users[userIndex];
      user.waterIntake = updatedWaterIntake;  // Update the waterIntake for the logged-in user
  
      // Store the updated user back to localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Update the users array in localStorage with the updated user data
      users[userIndex] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    // Close the modal after saving changes
    setShowModal(false);
  };
  

  // Calculate the difference in water intake between two dates
  const handleCalculateDifference = () => {
    const startIntake = waterIntake.find(
      (entry) => entry.date === startDate
    );
    const endIntake = waterIntake.find(
      (entry) => entry.date === endDate
    );

    if (startIntake && endIntake) {
      setIntakeDifference(endIntake.quantity - startIntake.quantity);
    } else {
      setIntakeDifference(null);
      alert("Please select valid dates with recorded water intake.");
    }
  };


  return (
    <div>
        <Navbar/>
    <div className='dashboard'>
      <h2>Your Daily Water Intake</h2>
      <div className='container-fluid  '>
        <div className=' justify-content-center d-flex align-items-center '>
          <div className='card bd-white mt-5 p-4 ' >
        {currentItems.map((item, index) => (
          <div key={index}>
            <div>
              <strong>Intake:</strong> {item.quantity} ml <br />
              <small><b>Added at:</b> {new Date(item.date).toLocaleString()}</small>
            </div>
            <div className='button'>
              <button className="btn btn-success btn-sm mr-2" onClick={() => handleEditClick(indexOfFirstItem + index)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(indexOfFirstItem + index)}>Delete</button>
            </div>
          </div>
        ))}
     </div>
     </div>
     </div>
     <div className='difference'>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCalculateDifference}>
        Calculate Difference
      </button>
      </div>
      {intakeDifference !== null && (
        <div>
          <h3>Difference in Water Intake:</h3>
          <p>{intakeDifference} liters</p>
        </div>
      )}
      <nav className="mt-3">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <li key={pageIndex} className={`page-item ${pageIndex + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(pageIndex + 1)}>
                {pageIndex + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Edit Modal */}
      <div className='editModal'>
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close btn btn-danger" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <h5 className="modal-title">Edit Water Intake</h5>
              <div className="modal-body">
                <label>Intake (ml):</label>
                <input
                  type="number"
                  className="form-control"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div> 
      )}
     </div>
    </div>
    </div>
  );
};

export default WaterIntakeList;
