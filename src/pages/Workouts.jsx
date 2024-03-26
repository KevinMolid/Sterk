import React from 'react'
import WorkoutCard from '/src/components/WorkoutCard.jsx'

function Workouts() {
    return (
      <main>
        <h2>Workouts</h2>
        <div className="exercises--input-wrapper">
          <span className="exercises--input-icon material-symbols-outlined">
            search
          </span>
          <input className="exercises--input" type="text" placeholder='Search'/>
        </div>
        <WorkoutCard />
        <h3>Stronglifts 5x5 A</h3>
        <p>
          <span className='bold'>Squat</span> 5x
          <br />
          <span className='bold'>Bench press</span> 5x
          <br />
          <span className='bold'>Barbell row</span> 5x
        </p>
        <button className='btn btn-primary'>Start workout <i className="btn-icon fa-solid fa-chevron-right"></i></button>
        
        <h3>Stronglifts 5x5 B</h3>
        <p>
          <span className='bold'>Squat</span> 5x
          <br />
          <span className='bold'>Bench press</span> 5x
          <br />
          <span className='bold'>Barbell row</span> 5x
        </p>
        <button className='btn btn-primary'>Start workout <i className="btn-icon fa-solid fa-chevron-right"></i></button>
      </main>
    )
  }
  
  export default Workouts