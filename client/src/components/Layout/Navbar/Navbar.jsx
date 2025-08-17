import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./navbar.css";
import profileImage from './../../assets/defaultProfile.jpg'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [username,setUsername]=useState('');

  useEffect(()=>{
    const stored = localStorage.getItem('todoUserData');
        if (stored) {
          const user = JSON.parse(stored).user;
          setUsername(user.username);
        }
  },[]);
  
 const navigate=useNavigate();
  const logoutHandler=()=>{
    localStorage.removeItem('todoUserData');
    navigate('/login');
    toast.success("logout successfully")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Menu items (large screen) */}
        <div className="nav-links large-screen">
          <Link to="/home"><i className="fa fa-home"></i> Home</Link>
          <Link to="/home"><i className="fa-solid fa-trophy"></i> Progress</Link>
          {/* <Link to="/logout"><i className="fa fa-sign-out"></i> Logout</Link> */}
        </div>

        {/* Menu toggle (small screen) */}
        <div
          className="menu-toggle small-screen"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </div>

        {/* Profile icon */}
        <div className="user-icon">
          <i
            className="fa fa-user-circle"
            onClick={() => setShowProfile(!showProfile)}
            style={{ cursor: "pointer" }}
          ></i>

          {/* Popup menu */}
          {showProfile && (
            <div className="profile-popup">
              <Link to='/profile' onClick={() => setShowProfile(false)}>
              <img
                src={profileImage}
                alt="Profile"
                className="profile-img"
              />
              </Link>
              <p className="welcome-text">{username || "user"}</p>
              <button className="logout-btn" onClick={logoutHandler}>
                  <i className="fa fa-sign-out"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {isOpen && (
        <div className="nav-links dropdown small-screen">
          <Link to="/home" onClick={() => setIsOpen(false)}>
            <i className="fa fa-home"></i> Home
          </Link>
          <Link to="/todos" onClick={() => setIsOpen(false)}>
            <i className="fa fa-list-alt"></i> Todos
          </Link>
          {/* <Link to="/logout" onClick={() => setIsOpen(false)}>
            <i className="fa fa-sign-out"></i> Logout
          </Link> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
