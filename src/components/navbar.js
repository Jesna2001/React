import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status from localStorage
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("sessionTime");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="navbar-brand">
        <h4>Daily Water Intake System</h4>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {/* Always Visible Links */}
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/AboutUs" className="nav-link">
              About Us
            </NavLink>
          </li>

          {/* Links Visible Only When Logged In */}
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink to="/add_water" className="nav-link">
                  Add Water Intake
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Links Visible Only When Logged Out
            <>
            <li className="nav-item">
              <NavLink to="/sign_in" className="nav-link">
                Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            </> 
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
