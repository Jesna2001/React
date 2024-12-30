import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import { useNavigation } from 'react-router-dom';

const WaterIntake = () => {
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    const loggedInEmail = localStorage.getItem("loggedInEmail");

    if (loggedInStatus) {
      setIsLoggedIn(true);
    } else {
      navigate('/'); // Redirect to home if not logged in
    }
  }, [navigate]);

  // Retrieve users array and the currently logged-in user
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const loggedInEmail = localStorage.getItem('loggedInEmail');
  const userIndex = users.findIndex(user => user.email === loggedInEmail);
  const user = users[userIndex];

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleAddIntake = (e) => {
    e.preventDefault();

    if (!user) {
      setMessage('User not found.');
      return;
    }

    // Check if today's entry already exists
    const alreadyLoggedToday = user.waterIntake.some(entry => entry.date === today);

    if (alreadyLoggedToday) {
      setMessage('You have already logged your water intake for today.');
      return;
    }

    // Add new entry to the user's water intake
    const newEntry = { date: today, quantity };
    const updatedUser = {
      ...user,
      waterIntake: [...user.waterIntake, newEntry],
    };

    // Update the users array with the updated user
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setQuantity('');
    setMessage('Water intake logged successfully!');
  };

  return (
    <div>
      <Navbar/>
    <div className='waterIntakePage'>
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4" >
      <h2 className="card-title text-center">Add Today's Water Intake</h2>
      {message && <p className="text-danger text-center mt-2">{message}</p>}
      <form onSubmit={handleAddIntake}>
        <label>Enter Today's Water Intake:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Water intake in ml"
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Add Intake</button>
      </form>
      
    </div>
    </div>
    </div>
    </div>
  );
};

export default WaterIntake;
