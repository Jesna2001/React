import React, { useState } from 'react';
import '../App.css';
import Navbar from "./navbar";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    // Retrieve existing users or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    const emailExists = users.some((user) => user.email === formData.email);
    if (emailExists) {
      setError("Email is already registered");
      return;
    }

    // Create a new user
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      token: "mock_token_123", // Mock token generation
      waterIntake: [], // Initialize an empty array for water intake entries
    };

    // Add the new user to the users array and save it back to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Reset form and error
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setError('');
    alert("User signed in successfully!");
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className='signInPage'>
        <div className='container-fluid'>
          <div className='justify-content-center d-flex align-items-center'>
            <div className='card bd-white mt-5 p-4' style={{ width: '25rem' }}>
              <div className='card-body'>
                <h2 className='card-title text-center mb-4'>Sign In</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <label><b>Username:</b></label><br />
                  <input className='mb-3 input-box form-control'
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <label><b>Email:</b></label><br />
                  <input className='mb-3 input-box form-control'
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label ><b>Password:</b></label><br />
                  <input className='mb-3 input-box form-control'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label ><b>Confirm Password:</b></label><br />
                  <input className='mb-3 input-box form-control'
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button className='btn btn-primary mt-3' type="submit">Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
