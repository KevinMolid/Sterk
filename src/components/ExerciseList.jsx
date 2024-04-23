import { React, useState, useContext } from 'react'
import UserContext from '../UserContext'


export default function ExerciseList({ addExercise }){
    const { exercises } = useContext(UserContext)

    return(
        <div className='exercise-list'>
            <h1 className='exercise-list--heading'>Choose exercise</h1>
            <ul>
                {exercises.map(exercise => {
                    const value = exercise.id

                    function test(){
                        addExercise(exercise)
                    }

                    return (
                        <li key={value}
                            onClick={test}>
                                {exercise.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}