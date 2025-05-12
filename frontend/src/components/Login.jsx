

import React, { useState, useEffect } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import Swal from "sweetalert2"; // SweetAlert2

export default function Login({ setRoleVar }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  axios.defaults.withCredentials = true; 


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = () => {
    axios
      .post("https://booksmania-7.onrender.com/auth/login", {
        username: username,
        password: password,
        role: role,
      })
      .then((res) => {
        if (res.data.login && res.data.role === "admin") {
          setRoleVar("admin");
          localStorage.setItem("isLoggedIn", true); // Store login state in localStorage
          navigate("/dashboard");
        } else if (res.data.login && res.data.role === "student") {
          setRoleVar("student");
          localStorage.setItem("isLoggedIn", true); 
          navigate("/");
        }
       
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${username}!`,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
        });
        console.log(err);
      });
  };

  return (
    <div className="login-page" data-aos="fade-up">
      <div className="login-container" data-aos="fade-right">
        <h1>Login</h1> <br />
        <div className="form-group" data-aos="fade-left">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Your Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group" data-aos="fade-left">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group" data-aos="fade-left">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="btn-login" onClick={handleSubmit} data-aos="zoom-in">
          Login
        </button>
      </div>
    </div>
  );
}
