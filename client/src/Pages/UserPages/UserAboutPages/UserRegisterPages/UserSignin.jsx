import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserSignin() {

const [name,setName ] =useState('');
const [email, setEmail] =useState('');
const [password,setPassword] =useState('');
const navigate =useNavigate();

const handleSubmit=(e)=>{
axios.post("http://localhost:2000/register",{name,email,password})
.then(result =>{
    console.log(result)
    localStorage.setItem('user',JSON.stringify({
        name:name,
        email:email,
        signInDate: new Date().toISOString()
      }));
      navigate('/login');
      setName('');
      setEmail('');
      setPassword('');
      
        })
        .catch(err =>{
            console.log(err);
          })
}


  return (
    <div>
<div>
<div> <img src="../../Media/red.png" alt="" />  </div>
<h3>Sign In</h3>
<form onSubmit={handleSubmit}>
    <div>
    <label htmlFor="name">Name: </label>
    <input type="text" name='name' required onChange={(e)=>setName(e.target.value)} />
    </div>

    <div>
    <label htmlFor="email">Email: </label>
    <input type="email" name='email' required onChange={(e)=>setEmail(e.target.value)} />
    </div>

    <div>
    <label htmlFor="password">Password: </label>
    <input type="password" name='password' required onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <button type="submit">Sign Up</button>

</form>
<p className='signin-message'>Already have an account?</p>
<Link className='link' to="/login">Login</Link>
</div>

    </div>
  )
}

export default UserSignin