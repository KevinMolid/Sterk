import React from 'react'

function NavBar() {
    return (
      <nav className='navBar'>
        <ul className='navBar--ul'>
          <li className='navBar--li'><a href="/exercises"><i className="navBar--icon fa-solid fa-dumbbell"></i> Exercises</a></li>
          <li className='navBar--li'><a href="/workouts"><i className="navBar--icon fa-solid fa-person-walking"></i> Workouts</a></li>
          <li className='navBar--li'><a href="/progress"><i className="navBar--icon fa-solid fa-chart-line"></i> Progress</a></li>
        </ul>
      </nav>
    )
  }
  
  export default NavBar