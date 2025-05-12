import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import DeleteBook from "./components/DeleteBook";
import "./index.css";
 // import it at the top

import Logout from "./components/Logout";
import axios from "axios";

function App() {
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true; 
  useEffect(() => {
    axios
      .get("https://booksmania-6.onrender.com/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books role={role}/>} />
        <Route path="/login" element={<Login setRoleVar={setRole} />}></Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/addbook" element={<AddBook/>} />
        <Route path="/update/:id" element={<EditBook />} />
        <Route path="/delete/:id" element={<DeleteBook />} />
    


        <Route path="/logout" element={<Logout setRole={setRole} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
