import { React, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext.jsx'

export default function Workout(){
    const { activeWorkout } = useContext(UserContext)
    const [ exercises, setExercises ] = useState(activeWorkout.exercises)
    const [ sessionData, setSessionData ] = useState(exercises.map(exercise => {
        return {
            name: exercise.name,
            sets: exercise.sets
        }
    }))

    useEffect(() => {
        setExercises(activeWorkout.exercises)
    },  [activeWorkout])

    function handleInput(exerciseIndex, setIndex, key, value) {
        setSessionData(prevData => prevData.map((exercise, index) => {
            if (index === exerciseIndex) {
                const updatedSets = exercise.sets.map((set, idx) => {
                    if (idx === setIndex) {
                        return { ...set, [key]: value }
                    }
                    return set
                })
                return { ...exercise, sets: updatedSets }
            }
            return exercise
        }))
    }

    function handleCompleted() {
        console.log(sessionData)
    }

    function finishWorkout() {
        console.log('Workout completed!')
    }

    function cancelWorkout() {
        console.log('Workout canceled!')
    }

    return (
        <main>
            <div className='margin-bottom-1 flex-space'>
                <Link className="link" 
                    to={`/workouts`}>
                    <i className="fa-solid fa-arrow-left"></i> {`Back to workouts`}
                </Link>
                <button className='btn-txt' onClick={finishWorkout}>Finish workout</button>
            </div>
            <h2 className='margin-bottom-1'>{activeWorkout.name}</h2>
            {sessionData && sessionData.map((exercise, exerciseIndex) => {
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
                                    <input type="number"
                                        value={set.weight}
                                        onChange={(e) => handleInput(exerciseIndex, index, 'weight', e.target.value)}/>
                                    <input type="number" 
                                        value={set.reps} 
                                        onChange={(e) => handleInput(exerciseIndex, index, 'reps', e.target.value)}/>
                                    <button className='btn-complete' onClick={handleCompleted}>
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
            )})}
            <button className='btn btn-txt' onClick={cancelWorkout}>Cancel workout</button>
        </main>
    )
}