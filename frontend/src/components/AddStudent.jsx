import React from "react";
import "../css/AddStudent.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Student() {
  const [roll, setRoll] = useState("");
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/student/register", {
        roll,
        username,
        grade,
        password,
      })
      .then((res) => {
        if (res.data.registered) {
          navigate("/dashboard");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h1>Add Student</h1>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
