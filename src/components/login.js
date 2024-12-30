import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === "true";
    const sessionTime = localStorage.getItem('sessionTime');
    const sessionExpiry = 24* 60 * 60 * 1000; // 24 hours in milliseconds

    if (isLoggedIn && sessionTime && (Date.now() - sessionTime < sessionExpiry)) {
      navigate('/');
    } else {
      localStorage.setItem('loggedIn', 'false'); // reset login status if session expired
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Find the user with matching email and password
    const user = users.find((u) => u.email === email && u.password === password);
  
    if (user) {
      // Set the logged-in user and session details
      if (user && user.email === email && password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("loggedInEmail", user.email); // Save the logged-in user's email
        localStorage.setItem("sessionTime", Date.now());
        navigate('/');
      }
      ;
    } else {
      setError('Invalid email or password');
    }
  };
  
  return (
    <div>
    <Navbar/>
    <div className='loginPage'>
    <div className='container-fluid  '>
        <div className=' justify-content-center d-flex align-items-center '>
          <div className='card bd-white mt-5 p-4 ' style={{width:'25rem'}}>
        <h2 className="card-title text-center">Login</h2>
        {error && <p className="text-danger text-center mt-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-2">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-2">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
         
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Login;
