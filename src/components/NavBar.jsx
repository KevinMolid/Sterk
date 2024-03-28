import React, { useState } from 'react'

function NavBar() {
    const [activePage, setActivePage] = useState(0)

    return (
      <nav className='navBar'>
        <ul className='navBar--ul'>
          <li className='navBar--li'>
            <a href="/">
              <i className="navBar--icon fa-solid fa-house"></i>
              <span className='small'>Home</span>
            </a>
          </li>
          <li className='navBar--li'>
            <a href="/exercises">
              <i className="navBar--icon fa-solid fa-dumbbell"></i>
              <span className='small'>Exercises</span>
            </a>
          </li>
          <li className='navBar--li'>
            <a href="/workouts">
              <i className="navBar--icon fa-solid fa-person-walking"></i>
              <span className='small'>Workouts</span>
            </a>
          </li>
          <li className='navBar--li'>
            <a href="/profile">
              <i className="navBar--icon fa-solid fa-user"></i>
              <span className='small'>Profile</span>
            </a>
          </li>
          <li className='navBar--li'>
            <a href="/progress">
              <i className="navBar--icon fa-solid fa-chart-line"></i>
              <span className='small'>Progress</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
  
  export default NavBar