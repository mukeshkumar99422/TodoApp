import React, { useState } from 'react'
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';
import { toast } from 'react-hot-toast';
import { getErrorMessage } from '../../Utils/ErrorMessage';



function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate();

  const handleLogin=async (e)=>{
    try {
      e.preventDefault();
      const data={'email':email,'password':password};
      const res=await AuthServices.loginUser(data);

      toast.success('Login successful');
      console.log('login successful', res.data);

      // Store user data in localStorage
      localStorage.setItem('todoUserData',JSON.stringify(res.data));

      // Redirect to home page after successful login
      navigate('/home');
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log("Login failed:", error);

      setEmail('');
      setPassword('');
    }
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign In to Continue</h2>
        <p className="login-subtitle">Access your personalized task list</p>
        <form className="login-form" 
          onSubmit={handleLogin}
          >
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login