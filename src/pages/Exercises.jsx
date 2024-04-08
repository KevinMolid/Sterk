import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExerciseCard from '../components/ExerciseCard.jsx'
import AddExerciseModal from '../components/AddExerciseModal.jsx'
import Badge from '../components/Badge.jsx'

// Exercises component
function Exercises({ refreshFlag, exercises, handleExerciseAdded }) {
  const [modalExpanded, setModalExpanded] = useState(false)

  function toggleModal() {
    setModalExpanded(prevState => !prevState)
  }

  const exercisesHTML = exercises.map(exercise => {
    return (
      <Link key={exercise.id} 
        to={`/exercises/${exercise.id}`}
        aria-label={`view details for ${exercise.name}`} >
        <ExerciseCard exercise={exercise} />
      </Link>
    )
  })

  return (
    <main>
      <div className='exercises--heading-wrapper'>
        <h2>Exercises</h2>
        <button onClick={toggleModal}
          className='btn btn-primary btn-small'>
          {modalExpanded && <i className="fa-solid fa-x"></i>}
          {!modalExpanded && <i className="fa-solid fa-plus"></i>}</button>
      </div>
      {modalExpanded && <AddExerciseModal toggleModal={toggleModal} handleExerciseAdded={handleExerciseAdded}/>}
      <div className="exercises--input-wrapper">
        <span className="exercises--input-icon material-symbols-outlined">
          search
        </span>
        <input className="exercises--input" type="text" placeholder='Search'/>
      </div>
      <div className="flex-gap margin-bottom-1">
        <Badge className="calisthenics pointer">Calisthenics</Badge>
        <Badge className="cardio pointer">Cardio</Badge>
        <Badge className="strength pointer">Strength</Badge>
      </div>
      {exercisesHTML}
    </main>
  )
}

export default Exercises