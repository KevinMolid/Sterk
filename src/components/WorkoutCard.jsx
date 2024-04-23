import { React, useContext, useState } from 'react'
import UserContext from '../UserContext'


function WorkoutCard(props) {
    const { exercises } = useContext(UserContext)
    const [expanded, setExpanded] = useState(false)

    function toggleExpanded() {
        setExpanded(prevState => !prevState)
    }

    return (
        <div className='workout-card'>
            <h3>{props.name}</h3>
            <p className='workout-card--category'>{props.category}</p>

            <ul className='workout-card--exercises-ul'>
                {props.exercises.map(exercise => {
                    const ex = exercises.filter(obj => obj.id === exercise.exercise)
                    const exName = ex[0].name

                    const sets = exercise.sets ? Object.keys(exercise.sets).length : ""
                    const reps = exercise.sets ? exercise.sets[1].reps : ""
                    const weight = exercise.sets ? exercise.sets[1].weight : ""

                    return(
                        <li key={exercise.exercise} className='workout-card--exercise-li'>
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