import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import Logout from "./components/Logout";
import axios from "axios";

function App() {
  const [role, setRole] = useState('');
  axios.defaults.withCredentials = true; // Enable sending cookies with requests
  useEffect(() => {
    axios.get('http://localhost:5000/auth/verify').then((res) => {
      if(res.data.login) {
        setRole(res.data.role);
      }
      else{
        setRole('');
      }
      console.log(res);
    }).catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <Navbar role ={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login setRole={setRole} />}></Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addbook" element={<Books />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/logout" element={<Logout setRole = {setRole}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
