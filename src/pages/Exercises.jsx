import React from 'react'
import exercises from '../data/exercises.jsx'
import ExerciseCard from '../components/ExerciseCard.jsx'

const exercisesHTML = exercises.map(exercise => {

  return (
    <ExerciseCard key={exercise.id} exercise={exercise} />
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