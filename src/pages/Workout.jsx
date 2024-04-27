import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext.jsx'

export default function Workout(){
    const { activeWorkout } = useContext(UserContext)

    return (
        <main>
            <div className='margin-bottom-1 flex-space'>
                <Link className="link" 
                    to={`/workouts`}>
                    <i className="fa-solid fa-arrow-left"></i> {`Back to workouts`}
                </Link>
                <button className='btn-txt'>Finish workout</button>
            </div>
            <h2 className='margin-bottom-1'>{activeWorkout.name}</h2>
            {activeWorkout.exercises && activeWorkout.exercises.map(exercise => {
                return (
                    <div key={exercise.name} className='margin-bottom-1'>
                        <h3>{exercise.name}</h3>
                        {exercise.sets.map((set, index) => {
                            return(
                                <p key={exercise.name + index}>{set.reps} x {set.weight}kg</p>
                            )
                        })}
                    </div>
            )})}
            <button className='btn btn-txt'>Cancel workout</button>
        </main>
    )
}