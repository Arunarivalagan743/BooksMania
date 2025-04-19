// import React, { useState } from 'react'
// import '../css/Login.css'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// export default function Login({setRole}) {
//   const navigate = useNavigate();
//   const [username,setUsername]= useState('')
//   const [password,setPassword]= useState('')
//   const [role, setRole] = useState('admin')



// axios.defaults.withCredentials = true; // Enable sending cookies with requests
//   const handleSubmit =() =>{
   
//     axios.post('http://localhost:5000/auth/login', {
//       username: username,
//       password: password,
//       role: role
//     })
//     .then(res => {
//       if (res.data.login && res.data.role === 'admin') {
//        setRole('admin'); // Set the role in the parent component
//       localStorage.setItem('isLoggedIn', true); // Store login state in localStorage
//       navigate('/dashboard');
//       }
//       else if(res.data.login && res.data.role === 'student') {
//        setRole('student'); // Set the role in the parent component
//         localStorage.setItem('isLoggedIn', true); // Store login state in localStorage
//         navigate('/');
//       }
      
//       console.log(res);
//     })
//     .catch(err => console.log(err));
//   }
//   return (
//     <div className='login-page'>
//       <div className='login-container'>
//         <h1>Login</h1> <br />
//         <div className='form-group'>
//           <label htmlFor='username'>Username</label>
//           <input type='text' placeholder='Enter Your Username'  name='username' required
//          onChange={(e) => setUsername(e.target.value)} />   
//     </div>
//         <div className='form-group'>
//           <label htmlFor='password'>Password</label>
//           <input type='password' placeholder='Enter Your Password'  name='password' required
//            onChange={(e) => setPassword(e.target.value)} /> 
//         </div>
//         <div className='form-group'>
//           <label htmlFor='role'>Role:</label>
//           <select id='role' name='role'  onChange={(e) => setRole(e.target.value)}>
//             <option value='admin'>Admin</option>
//             <option value='student'>Student</option>
            
//           </select>
//         </div>
//         <button className='btn-login'
//         onClick={handleSubmit} >Login</button>
        
//     </div>
//     </div>
//   )
// }
import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setRole }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin'); // renamed to avoid conflict

  axios.defaults.withCredentials = true; // Enable sending cookies with requests

  const handleSubmit = () => {
    axios.post('http://localhost:5000/auth/login', {
      username: username,
      password: password,
      role: selectedRole,
    })
    .then(res => {
      if (res.data.login && res.data.role === 'admin') {
        setRole('admin'); // setRole from props to update parent
        localStorage.setItem('isLoggedIn', true);
        navigate('/dashboard');
      } else if (res.data.login && res.data.role === 'student') {
        setRole('student'); // setRole from props to update parent
        localStorage.setItem('isLoggedIn', true);
        navigate('/');
      }
      console.log(res);
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h1>Login</h1> <br />
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            placeholder='Enter Your Username'
            name='username'
            required
            onChange={(e) => setUsername(e.target.value)}
          />   
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter Your Password'
            name='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          /> 
        </div>
        <div className='form-group'>
          <label htmlFor='role'>Role:</label>
          <select
            id='role'
            name='role'
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value='admin'>Admin</option>
            <option value='student'>Student</option>
          </select>
        </div>
        <button className='btn-login' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}
