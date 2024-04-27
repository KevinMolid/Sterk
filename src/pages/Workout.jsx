import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext.jsx'

export default function Workout(){
    const { activeWorkout } = useContext(UserContext)

    return (
        <main>
            <div className='margin-bottom-1'>
                <Link className="link" 
                    to={`/workouts`}>
                    <i className="fa-solid fa-arrow-left"></i> {`Back to workouts`}
                </Link>
            </div>
            <h2 className='margin-bottom-1'>{activeWorkout.name}</h2>
            {activeWorkout.exercises && activeWorkout.exercises.map(exercise => {
                return (
                    <div key=>
                        <h3>{exercise.name}</h3>
                    </div>
            )})}
            <button className='btn btn-primary'>Finish workout</button>
        </main>
    )
}