import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    const [activePage, setActivePage] = useState(0)

    return (
      <nav className='navBar'>
        <ul className='navBar--ul'>
          <li className='navBar--li'>
            <Link to="/">
              <i className="navBar--icon fa-solid fa-house"></i>
              <span className='small'>Home</span>
            </Link>
          </li>
          <li className='navBar--li'>
            <Link to="/exercises">
              <i className="navBar--icon fa-solid fa-dumbbell"></i>
              <span className='small'>Exercises</span>
            </Link>
          </li>
          <li className='navBar--li'>
            <Link to="/workouts">
              <i className="navBar--icon fa-solid fa-person-walking"></i>
              <span className='small'>Workouts</span>
            </Link>
          </li>
          <li className='navBar--li'>
            <Link to="/profile">
              <i className="navBar--icon fa-solid fa-user"></i>
              <span className='small'>Profile</span>
            </Link>
          </li>
          <li className='navBar--li'>
            <Link to ="/progress">
              <i className="navBar--icon fa-solid fa-chart-line"></i>
              <span className='small'>Progress</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
  
  export default NavBar