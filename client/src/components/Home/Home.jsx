/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar/Navbar';
import './home.css';
import CreatePopUp from '../Todos/CreatePopUp '; // import popup component
import TodoList from '../Todos/TodoList'
import toast from 'react-hot-toast';
import {getErrorMessage} from '../../Utils/ErrorMessage'

import { UserContext } from '../../context/UserContext';
import { TodoContext } from '../../context/TodoContext';

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [username,setUsername]=useState('');
  const {getTodos}=useContext(TodoContext);
  

  useEffect(()=>{
  const stored = localStorage.getItem('todoUserData');
      if (stored) {
        const user = JSON.parse(stored).user;
        setUsername(user.username);
      }
  },[]);


useEffect(()=>{
  const init=async ()=>{
    try {
      await getTodos();
    } catch (error) {
      toast(getErrorMessage(error));
      console.log(error);
    }
  }
  init();
},[])




  return (
    <div className='main-home-container'>
      <Navbar />
      <div className="home-container">
        <div className="welcome-box">
          <h1>Welcome, {username || 'User'} 👋</h1>
          <p>Manage your tasks efficiently and stay organized.</p>

          <div className="home-actions">
            {/* <Link to="/todos" className="home-btn primary-btn">
              View Todos
            </Link> */}
            <button
              className="home-btn secondary-btn"
              onClick={() => setShowPopup(true)}
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <CreatePopUp
          onClose={() => setShowPopup(false)}
        />
      )}
      <TodoList/>
    </div>
  );
}

export default Home;
