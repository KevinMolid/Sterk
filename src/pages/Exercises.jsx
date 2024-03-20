import React, { useState, useEffect } from 'react'
import ExerciseCard from '../components/ExerciseCard.jsx'
import AddExerciseModal from '../components/AddExerciseModal.jsx'

import { initializeApp } from "firebase/app"

// Firebase Firestore
import { getFirestore, getDocs, 
  collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAgCPUoe9DyIhBeHrHwWjAsSgVqdt2qZRY",
  authDomain: "sterk-1cc56.firebaseapp.com",
  projectId: "sterk-1cc56",
  storageBucket: "sterk-1cc56.appspot.com",
  messagingSenderId: "1053630322021",
  appId: "1:1053630322021:web:5779880d99cfd1d230bd8c"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Exercises component
function Exercises() {
  const [modalExpanded, setModalExpanded] = useState(false)
  const [exercises, setExercises] = useState([])

  function toggleModal() {
    setModalExpanded(prevState => !prevState)
  }

  useEffect(() => {
    const fetchExercises = async () => {
      const querySnapshot = await getDocs(collection(db, "exercises"))
      const exercisesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setExercises(exercisesList)
    }
    fetchExercises()
  })

  /*
  async function fetchAndRenderExercises() {
    setExercisesHTML([])
    const querySnapshot = await getDocs(collection(db, "exercises"))
    querySnapshot.forEach((exercise) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(exercise.data().name)
      setExercisesHTML(prevExercises => [...prevExercises, <ExerciseCard key={exercise.id} exercise={exercise.data()} />])
    })
  }*/

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
      {modalExpanded && <AddExerciseModal toggleModal={toggleModal} />}
      {exercisesHTML}
    </main>
  )
}

export default Exercises