import React, { useState } from 'react';
import './Navbar.css'; // Importing the CSS file
import '../Data';
// Import logo
import logoimg from '../assets/images/logo-hospital.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='container-fluid g-0'>
            <div className='container'>
                <nav className="navbar">
                    <div className="navbar-container">
                        {/* Logo */}
                        <div className="logo">
                            <img src={logoimg} alt="Hospital Logo" />
                        </div>

                        {/* Nav Links */}
                        <ul className={isOpen ? "nav-links active" : "nav-links"}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/About">About us</Link></li>
                            <li><Link to="/AllDoctors">All Doctors</Link></li>
                            <li><Link to="/Contact">Contact</Link></li>
                        </ul>

                        {/* Sign Up and Login Buttons */}
                        <div className="auth-buttons">
                            <Link to="/signup" className="btn btn-primary text-white fs-6">Sign Up</Link>
                            <Link to="/login" className="btn btn-outline-primary text-blue fs-6">Login</Link>
                        </div>

                        {/* Toggle Button for Mobile */}
                        <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default Navbar;
