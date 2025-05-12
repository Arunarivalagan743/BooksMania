import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import { FaBars, FaBook, FaUser, FaCog, FaPlus } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import booksLogo from "../assets/books.png";

function Navbar({ role }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navMenuRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle outside clicks to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src={booksLogo} alt="Book Mania Logo" className="navbar-logo" />
          Book Mania
        </Link>
      </div>

      <button 
        className="navbar-toggle" 
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <FaBars />
      </button>

      <div 
        ref={navMenuRef}
        className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}
      >
        <Link to="/books" className="navbar-link">
          <FaBook /> Books
        </Link>

        {role === "admin" && (
          <>
            <Link to="/dashboard" className="navbar-link">
              <FaCog /> Dashboard
            </Link>
            <Link to="/addbook" className="navbar-link">
              <FaPlus /> Add Book
            </Link>
            <Link to="/addstudent" className="navbar-link">
              <FaPlus /> Add Student
            </Link>
          </>
        )}

        <Link to={role === "" ? "/login" : "/logout"} className="navbar-link">
          <FaUser /> {role === "" ? "Login" : "Logout"}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;