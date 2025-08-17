import React, { useState } from 'react'
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../Utils/ErrorMessage';



function Register() {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate();

  const handleRegister=async (e)=>{
    try {
      e.preventDefault();
      const data={'username':username,'email':email,'password':password};
      const res=await AuthServices.registerUser(data);

      toast.success('Registration successful');
      console.log('registration successful',res.data);

      // Redirect to login page after successful registration
      navigate('/login');

    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("registeration failed:", error);

      setUsername('');
      setEmail('');
      setPassword('');
    }
  }
    return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">Join the community and manage your tasks effortlessly</p>
        <form className="register-form"
          onSubmit={handleRegister}
          >
          <input
            type="text"
            className="register-input username-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="register-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="register-button" type="submit">
            Sign Up
          </button>
        </form>
        <p className="register-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register