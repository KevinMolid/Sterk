import React from 'react'
import exercises from '../data/exercises.jsx'

const exercisesHTML = exercises.map(exercise => {

  return (
    <>
      <h3>{exercise.name}</h3>
      <p>Muscles: {exercise.bodyParts.join(', ')}</p>
    </>
  )
})

function Exercises() {
    return (
      <main>
        <h2>Exercises</h2>
        {exercisesHTML}
      </main>
    )
  }
  
  export default Exercises