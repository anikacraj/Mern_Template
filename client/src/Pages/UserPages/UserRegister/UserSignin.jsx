import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';





function UserSignin() {

    const [name,setName ] =useState('');
    const [email, setEmail] =useState('');
    const [password,setPassword] =useState('');
    const navigate =useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:2004/register", { name, email, password })
          .then(result => {
              const { status, message } = result.data;
              if (status === 'again') {
                  alert("An account with this email already exists. Please login.");
               
              } else if (status === 'success') {
                  console.log("Registration successful:", result.data);
                  localStorage.setItem('user', JSON.stringify({
                      name: name,
                      email: email,
                     
                      signInDate: new Date().toISOString()
                  }));
                  navigate('/login');
                  setName('');
                  setEmail('');
                  setPassword('');
              }
          })
          .catch(err => {
              console.error("Registration error:", err);
              alert("Something went wrong. Please try again later.");
          });
  };
        


  return (
    <div>
    <div>
    <div> <img src="../../Media/red.png" alt="" />  </div>
    <h3>Sign In</h3>
    <form onSubmit={handleSubmit}>
        <div>
        <label  htmlFor="name">Name: </label>
        <input type="text" name='name' required onChange={(e)=>setName(e.target.value)} />
        </div>
    
        <div>
        <label  htmlFor="email">Email: </label>
        <input type="email" name='email' required onChange={(e)=>setEmail(e.target.value)} />
        </div>
    
        <div>
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' required onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
    
    </form>
    <p >Already have an account?</p>
    <Link className='link' to="/login">Login</Link>
    </div>
    
        </div>
  )
}

export default UserSignin