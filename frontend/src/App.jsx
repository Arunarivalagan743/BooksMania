import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import DeleteBook from "./components/DeleteBook";
import Logout from "./components/Logout";

function App() {
  const [role, setRole] = useState("");

  // Ensure cookies are sent with every request
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://booksmania-7.onrender.com/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log("User verification:", res.data);
      })
      .catch((err) => {
        console.error("Verification error:", err);
        setRole(""); // optional: reset role on error
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books role={role} />} />
          <Route path="/login" element={<Login setRoleVar={setRole} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/update/:id" element={<EditBook />} />
          <Route path="/delete/:id" element={<DeleteBook />} />
          <Route path="/logout" element={<Logout setRole={setRole} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
