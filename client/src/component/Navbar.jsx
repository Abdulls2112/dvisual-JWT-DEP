import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      // Check if a JWT token is present in local storage
      const token = localStorage.getItem('jwtToken');
      // Update the login status based on the token
      setIsLoggedIn(!!token);
    };

    // Call the function to check login status initially
    checkLoginStatus();

    // Add a custom event listener to update login status dynamically
    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };

    // Listen for the custom event
    document.addEventListener('loginStatusChange', handleLoginStatusChange);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('loginStatusChange', handleLoginStatusChange);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded" style={{ backdropFilter: 'blur(34px)' }}>
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Dvisual
        </NavLink>
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
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
