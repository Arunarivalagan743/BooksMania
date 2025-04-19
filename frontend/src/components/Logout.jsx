import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Logout({ setRole }) {
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/auth/logout')
            .then(res => {
                if (res.data.logout) {
                    setRole('');
                    Navigate('/');
                }
            })
            .catch(err => console.log(err));
    }, []);

   
}

export default Logout
