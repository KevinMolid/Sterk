import React from 'react'

function Workouts() {
    return (
      <main>
        <h2>Workouts</h2>
        <input className='search-bar' type='text'></input>
        <h3>Stronglifts 5x5 A</h3>
        <p>
          <span className='bold'>Squat</span> 5x
          <br />
          <span className='bold'>Bench press</span> 5x
          <br />
          <span className='bold'>Barbell row</span> 5x
        </p>
        <button className='btn-primary'>Start workout <i className="btn-icon fa-solid fa-chevron-right"></i></button>
        
        <h3>Stronglifts 5x5 B</h3>
        <p>
          <span className='bold'>Squat</span> 5x
          <br />
          <span className='bold'>Bench press</span> 5x
          <br />
          <span className='bold'>Barbell row</span> 5x
        </p>
        <button className='btn-primary'>Start workout <i className="btn-icon fa-solid fa-chevron-right"></i></button>
      </main>
    )
  }
  
  export default Workouts