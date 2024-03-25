import React, { useState, useEffect } from 'react'
import ExerciseCard from '../components/ExerciseCard.jsx'
import AddExerciseModal from '../components/AddExerciseModal.jsx'

import { initializeApp } from "firebase/app"

// Firebase Firestore
import { getFirestore, getDocs, 
  collection } from "firebase/firestore"
  
import { db } from '../config.jsx'

// Exercises component
function Exercises({ refreshFlag, handleExerciseAdded }) {
  const [modalExpanded, setModalExpanded] = useState(false)
  const [exercises, setExercises] = useState([])

  function toggleModal() {
    setModalExpanded(prevState => !prevState)
  }

  useEffect(() => {
    const fetchExercises = async () => {
      const querySnapshot = await getDocs(collection(db, "exercises"))
      const exercisesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const alphabeticalExercisesList = exercisesList.sort(function(a, b) {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        } else {
          return 0
        }
      })
      setExercises(alphabeticalExercisesList)
    }
    fetchExercises()
  }, [refreshFlag]) // re-fetches when flagged

  const exercisesHTML = exercises.map(exercise => {
    return (
      <ExerciseCard key={exercise.id} exercise={exercise} />
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
      {exercisesHTML}
    </main>
  )
}

export default Exercises