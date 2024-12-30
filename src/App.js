import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  function goToSignIn() {
    navigate("/sign_in");
  }

  function goToLogin() {
    navigate("/login");
  }

  function goToDashboard() {
    navigate("/dashboard");
  }

  function goToIntake() {
    navigate("/add_water");
  }

  return (
    <div>
      <Navbar />
      <div className="homePage">
        <h1>Daily Water Intake System</h1>
        {/* Links Visible Only When Logged In */}
        {isLoggedIn ? (
          <>
            <div className="btn btn-primary homeButton" onClick={goToDashboard}>
              Dashboard
            </div>
            <div className="btn btn-primary homeButton" onClick={goToIntake}>
              Add Water Intake
            </div>
          </>
        ) : (
          <>
            <div className="btn btn-primary homeButton" onClick={goToSignIn}>
              Sign In
            </div>
            <div className="btn btn-primary homeButton" onClick={goToLogin}>
              Login
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
