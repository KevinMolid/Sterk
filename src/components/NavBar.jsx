import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    const [activePage, setActivePage] = useState(0)

    return (
      <nav className='navBar'>
        <ul className='navBar--ul'>
          <li className='navBar--li'>
            <NavLink to="/"
              className={({isActive}) => isActive ? 'navlink-active' : null}>
              <i className="navBar--icon fa-solid fa-house"></i>
              <span className='small navbar--a'>Home</span>
            </NavLink>
          </li>
          <li className='navBar--li'>
            <NavLink to="/exercises"
              className={({isActive}) => isActive ? 'navlink-active' : null}>
              <i className="navBar--icon fa-solid fa-dumbbell"></i>
              <span className='small navbar--a'>Exercises</span>
            </NavLink>
          </li>
          <li className='navBar--li'>
            <NavLink to="/workouts"
              className={({isActive}) => isActive ? 'navlink-active' : null}>
              <i className="navBar--icon fa-solid fa-person-walking"></i>
              <span className='small navbar--a'>Workouts</span>
            </NavLink>
          </li>
          <li className='navBar--li'>
            <NavLink to="/profile"
              className={({isActive}) => isActive ? 'navlink-active' : null}>
              <i className="navBar--icon fa-solid fa-user"></i>
              <span className='small navbar--a'>Profile</span>
            </NavLink>
          </li>
          <li className='navBar--li'>
            <NavLink to ="/progress"
              className={({isActive}) => isActive ? 'navlink-active' : null}>
              <i className="navBar--icon fa-solid fa-chart-line"></i>
              <span className='small navbar--a'>Progress</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
  
  export default NavBar