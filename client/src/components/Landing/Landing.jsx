import React from 'react'
import './landing.css'
import landingImage from './../assets/landingImage.webp'
import {Link } from 'react-router-dom'
function Landing() {
  return (
    <div>
      <div className='landing-container' >
        <div className='landing-content'>
          <h1 className='landing-title'>
            Never Miss a Task Again!
          </h1>
          <p className='landing-description'>
            Join over <span className='highlight'>5 million+</span> users and organize your life effortlessly.
          </p>
          <Link to='/home'>
          <button
            className='get-started-button'
            onMouseOver={e => {
              e.currentTarget.classList.add('hovered');
            }}
            onMouseOut={e => {
              e.currentTarget.classList.remove('hovered');
            }}
          >
            Get Started
          </button>
          </Link>
        </div>
        <img
          className='landing-image'
          src={landingImage}
          alt="Organize tasks"
        />
      </div>
    </div>
  )
}

export default Landing
