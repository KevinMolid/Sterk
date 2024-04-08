import React, { useState, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ExerciseCard from '../components/ExerciseCard.jsx'
import AddExerciseModal from '../components/AddExerciseModal.jsx'
import Badge from '../components/Badge.jsx'
import UserContext from '../UserContext'

// Exercises component
function Exercises({ refreshFlag, exercises, handleExerciseAdded }) {
  const [modalExpanded, setModalExpanded] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFilter = searchParams.get("category")
  const { userInDb } = useContext(UserContext)

  function toggleModal() {
    setModalExpanded(prevState => !prevState)
  }

  const displayedExercises = categoryFilter ? 
    exercises.filter(exercise => exercise.category === categoryFilter) :
    exercises

  const exercisesHTML = displayedExercises.map(exercise => {
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
        {userInDb ? userInDb.admin && <button onClick={toggleModal}
          className='btn btn-primary btn-small'>
          {modalExpanded && <i className="fa-solid fa-x"></i>}
          {!modalExpanded && <i className="fa-solid fa-plus"></i>}
        </button> : null}
      </div>
      {modalExpanded && <AddExerciseModal toggleModal={toggleModal} handleExerciseAdded={handleExerciseAdded}/>}
      <div className="exercises--input-wrapper">
        <span className="exercises--input-icon material-symbols-outlined">
          search
        </span>
        <input className="exercises--input" type="text" placeholder='Search'/>
      </div>
      <div className="flex-gap margin-bottom-1">
        <Link to="?category=calisthenics">
          <Badge className="calisthenics pointer">Calisthenics</Badge>
        </Link>
        <Link to="?category=cardio">
          <Badge className="cardio pointer">Cardio</Badge>
        </Link>
        <Link to="?category=strength">
          <Badge className="strength pointer">Strength</Badge>
        </Link>
      </div>
      {exercisesHTML}
    </main>
  )
}

export default Exercises