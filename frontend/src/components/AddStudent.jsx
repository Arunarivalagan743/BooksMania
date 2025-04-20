
import React, { useState, useEffect } from "react";
import "../css/AddStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // AOS Styles
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Student() {
  const [roll, setRoll] = useState("");
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Set animation duration for AOS
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send student data to the backend
    axios
      .post("http://localhost:5000/student/register", {
        roll,
        username,
        grade,
        password,
      })
      .then((res) => {
        if (res.data.registered) {
          // Show success message with SweetAlert2
          Swal.fire({
            icon: "success",
            title: "Student Registered",
            text: "The student has been successfully registered!",
          }).then(() => {
            navigate("/dashboard"); // Redirect to dashboard after successful registration
          });
        } else {
          console.log(res);
          // Show error message if registration fails
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "There was an issue registering the student. Please try again.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // Show error alert if request fails
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
      });
  };

  return (
    <div className="student-form-container" data-aos="fade-up">
      <form className="student-form" onSubmit={handleSubmit} data-aos="fade-down">
        <h1 data-aos="fade-right">Add Student</h1>
        <div className="form-group" data-aos="fade-left">
          <label htmlFor="roll">Roll No</label>
          <input
            type="text"
            placeholder="Enter Student roll"
            id="roll"
            name="roll"
            required
            onChange={(e) => setRoll(e.target.value)}
          />
        </div>
        <div className="form-group" data-aos="fade-right">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            placeholder="Enter username"
            id="username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group" data-aos="fade-left">
          <label htmlFor="grade">Grade</label>
          <input
            type="text"
            placeholder="Enter Student grade"
            id="grade"
            name="grade"
            required
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div className="form-group" data-aos="fade-right">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Enter Student password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" data-aos="fade-up">
          Register
        </button>
      </form>
    </div>
  );
}
