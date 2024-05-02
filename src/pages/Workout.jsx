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
                        <h3 className='margin-bottom-half'>{exercise.name}</h3>
                        <div className='grid-4-col margin-bottom-half'>
                            <p className='white small uppercase'>set</p>
                            <p className='white small uppercase'>kg</p>
                            <p className='white small uppercase'>reps</p>
                            <div className='width-32'></div>
                        </div>
                        {exercise.sets.map((set, index) => {
                            return(
                                <div className='grid-4-col margin-bottom-half' key={exercise.name + index}>
                                    <p>{index + 1}</p>
                                    <input type="number" value={set.weight}/>
                                    <input type="number" value={set.reps}/>
                                    <button className='btn-complete'><i className="fa-solid fa-check"></i></button>
                                </div>
                            )
                        })}
                    </div>
            )})}
            <button className='btn btn-txt'>Cancel workout</button>
        </main>
    )
}