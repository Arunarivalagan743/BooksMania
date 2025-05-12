import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { FaBars, FaBook, FaUser, FaCog, FaPlus } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import booksLogo from "../assets/books.png";

function Navbar({ role }) {
  const [menuActive, setMenuActive] = useState(false);
  
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  
  const [bookCount, setBookCount] = useState(0);
  
  useEffect(() => {
    const purchased = JSON.parse(localStorage.getItem("purchasedBooks")) || [];
    setBookCount(purchased.length);
    AOS.init({ duration: 1000 });
  }, []);
 
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarRight = document.querySelector('.navbar-right');
      const navbarToggle = document.querySelector('.navbar-toggle');
      
      if (menuActive && navbarRight && !navbarRight.contains(event.target) && 
          !navbarToggle.contains(event.target)) {
        setMenuActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuActive]);
  
  return (
    <nav className="navbar" data-aos="fade-down">
      <div className="navbar-left" data-aos="fade-right">
        <Link to="/" className="navbar-brand">
          <img src={booksLogo} alt="Book Mania Logo" className="navbar-logo" />
          Book Mania
        </Link>
      </div>
      <div className={`navbar-right ${menuActive ? 'active' : ''}`} data-aos="fade-left">
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
        {role === "" ? (
          <Link to="/login" className="navbar-link">
            <FaUser /> Login
          </Link>
        ) : (
          <Link to="/logout" className="navbar-link">
            <FaUser /> Logout
          </Link>
        )}
      </div>
      <button className="navbar-toggle" onClick={toggleMenu} data-aos="fade-up" aria-label="Toggle navigation">
        <FaBars />
      </button>
    </nav>
  );
}

export default Navbar;