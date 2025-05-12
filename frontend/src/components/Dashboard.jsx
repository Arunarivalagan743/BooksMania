import React from 'react';
import '../css/Dashboard.css'; // Import the CSS file
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
function Dashboard() {
    const [students, setStudents] = useState(0);
    const [books, setBooks] = useState(0);
    const [admins, setAdmins] = useState(0);
    useEffect(() => {
        axios.get('https://booksmania-7.onrender.com/dashboard', {
      withCredentials: true,
    })
            .then(res => {
                if (res.data.ok) {
                    setStudents(res.data.students);
                    setBooks(res.data.books);
                    setAdmins(res.data.admins);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome to the dashboard!</p>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    
                    <h2 className="card-title">Total Students</h2>
                    <p className="card-value blue">{students}</p>
                </div>
                <div className="dashboard-card">
                    <h2 className="card-title">Total Books</h2>
                    <p className="card-value green">{books}</p>
                </div>
                <div className="dashboard-card">
                    <h2 className="card-title">Admins</h2>
                    <p className="card-value red">{admins}</p>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;
