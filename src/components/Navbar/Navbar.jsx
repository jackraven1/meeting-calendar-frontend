import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Meeting Calendar</Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;