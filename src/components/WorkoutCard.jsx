import { React, useContext } from 'react'
import UserContext from '../UserContext'


function WorkoutCard(props) {
    const { exercises } = useContext(UserContext)
    
    return (
        <div className='workout-card'>
            <h3>{props.name}</h3>
            <p className='margin-bottom-half'>{props.description}</p>

            <ul className='workout-card--exercises-ul'>
                {props.exercises.map(exercise => {
                    const ex = exercises.filter(obj => obj.id === exercise.exerciseId)
                    const exName = ex[0].name

                    const sets = exercise.sets ? Object.keys(exercise.sets).length : ""
                    const reps = exercise.sets ? exercise.sets[0].reps : ""
                    const weight = exercise.sets ? exercise.sets[0].weight : ""

                    return(
                        <li key={exercise.exerciseId} className='workout-card--exercise-li'>
                            <span className='bold'>{exName}</span> <span>{sets} x {reps} {weight}kg</span>
                        </li>
                    )
                })}
            </ul>

            <button className='btn btn-primary'>
                Start workout
                <i className="btn-icon fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}

export default WorkoutCard