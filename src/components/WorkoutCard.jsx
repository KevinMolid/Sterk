import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'


function WorkoutCard(props) {
    const { exercises, setActiveWorkout } = useContext(UserContext)

    function startWorkout(workout) {
        console.log(`starting workout: ${workout.name}`)
        setActiveWorkout(workout)
    }

    return (
        <div className='workout-card'>
            <h3>{props.name}</h3>
            <p className='margin-bottom-half small'>{props.description}</p>

            <ul className='workout-card--exercises-ul'>
                {props.exercises.map(exercise => {
                    const ex = exercises.filter(obj => obj.id === exercise.exerciseId)
                    const exName = ex[0].name

                    const sets = exercise.sets ? Object.keys(exercise.sets).length : ""
                    const reps = exercise.sets ? exercise.sets[0].reps : ""
                    const weight = exercise.sets ? exercise.sets[0].weight : ""

                    return(
                        <li key={exercise.exerciseId} className='workout-card--exercise-li white'>
                            <span className='bold'>{exName}</span> <span>{sets} x {reps} {weight}kg</span>
                        </li>
                    )
                })}
            </ul>

            <Link to ='/workout' >
                <button className='btn btn-primary'
                    onClick={() => startWorkout(props)}>
                    Start workout
                    <i className="btn-icon fa-solid fa-chevron-right"></i>
                </button>
            </Link>
        </div>
    )
}

export default WorkoutCard