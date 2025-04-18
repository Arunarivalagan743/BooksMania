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
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
