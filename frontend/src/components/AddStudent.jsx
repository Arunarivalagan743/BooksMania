import React, { useState, useEffect } from "react";
import "../css/AddStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

export default function Student() {
  const [roll, setRoll] = useState("");
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://booksmania-7.onrender.com/student/register", {
        roll,
        username,
        grade,
        password,
      }, { withCredentials: true })
      .then((res) => {
        if (res.data.registered) {
          Swal.fire({
            icon: "success",
            title: "Student Registered",
            text: "The student has been successfully registered!",
          }).then(() => {
            navigate("/dashboard");
          });
        } else {
          console.log(res);
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "There was an issue registering the student. Please try again.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
