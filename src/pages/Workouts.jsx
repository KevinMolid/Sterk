import { React, useContext } from 'react'
import WorkoutCard from '/src/components/WorkoutCard.jsx'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'


function Workouts() {
  const { workouts } = useContext(UserContext)

    return (
      <main>
        <div className='workouts--heading-wrapper'>
          <h2>Workouts</h2>
          <Link to="/createworkout">
            <button className='btn-txt'>Create workout</button>
          </Link>
        </div>
        <div className="exercises--input-wrapper">
          <span className="exercises--input-icon material-symbols-outlined">
            search
          </span>
          <input className="exercises--input" type="text" placeholder='Search'/>
        </div>

        {workouts.map(workout => {
          return (
            <WorkoutCard key={workout.id} 
              name={workout.name} 
              category={workout.category}
              exercises={workout.exercises}
              />
          )
        })}
      </main>
    )
  }
  
  export default Workouts