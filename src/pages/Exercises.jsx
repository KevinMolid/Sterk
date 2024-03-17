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
        <div className='exercises--heading-wrapper'>
          <h2>Exercises</h2>
          <button className='btn btn-primary btn-small'><i class="fa-solid fa-plus"></i></button>
        </div>
        {exercisesHTML}
      </main>
    )
  }
  
  export default Exercises