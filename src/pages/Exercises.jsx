import React from 'react'
import exercises from '../data/exercises.jsx'
import ExerciseCard from '../components/ExerciseCard.jsx'
import AddExerciseModal from '../components/AddExerciseModal.jsx'

const exercisesHTML = exercises.map(exercise => {

  return (
    <ExerciseCard key={exercise.id} exercise={exercise} />
  )
})

function Exercises() {
  const [modalExpanded, setModalExpanded] = React.useState(false)

  function toggleModal() {
    setModalExpanded(prevState => !prevState)
  }

  return (
    <main>
      <div className='exercises--heading-wrapper'>
        <h2>Exercises</h2>
        <button onClick={toggleModal}
          className='btn btn-primary btn-small'>
          {modalExpanded && <i class="fa-solid fa-x"></i>}
          {!modalExpanded && <i class="fa-solid fa-plus"></i>}</button>
      </div>
      {modalExpanded && <AddExerciseModal />}
      {exercisesHTML}
    </main>
  )
}

export default Exercises