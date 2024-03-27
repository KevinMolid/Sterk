import React, { useState } from 'react'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

import { db } from '../config.jsx'

// Modal
function AddExerciseModal(props) {
  // State hooks for input fields
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [root, setRoot] = useState('')
  const [primaryMuscles, setPrimaryMuscles] = useState([])
  const [secondaryMuscles, setSecondaryMuscles] = useState([])

  // Options for muscles
  const muscles = ['Delts (Front)', 'Delts (Middle)', 'Delts (Rear)', 'Pecs (Major)', 'Pecs (Minor)',
    'Lats', 'Traps', 'Rhomboids', 'Biceps', 'Triceps', 'Forearm Flexors',
    'Forearm Extensors', 'Rotator Cuff', 'Abs', 'Obliques', 'Lower Back', 'Glutes', 'Quadriceps', 
    'Hamstrings', 'Calves']

  // Handle changes in input fields
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleTypeChange = (event) => {
    setType(event.target.value)
  }

  const handleRootChange = (event) => {
    setRoot(event.target.value)
  }

  const handlePrimaryMusclesChange = (event) => {
    const value = event.target.value
    if (event.target.checked) {
      // If checked => add item to array
      setPrimaryMuscles([...primaryMuscles, value])
    } else {
      // If unchecked => remove from array
      setPrimaryMuscles(primaryMuscles.filter(muscle => muscle !== value))
    }
  }

  const handleSecondaryMusclesChange = (event) => {
    const value = event.target.value
    if (event.target.checked) {
      // If checked => add item to array
      setSecondaryMuscles([...secondaryMuscles, value])
    } else {
      // If unchecked => remove from array
      setSecondaryMuscles(secondaryMuscles.filter(muscle => muscle !== value))
    }
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Submitting form with:', { name, category, type, root, primaryMuscles, secondaryMuscles })
    try {
      await addDoc(collection(db, "exercises"), {
        name: name,
        category: category,
        primaryMuscles: primaryMuscles,
        secondaryMuscles: secondaryMuscles,
        root: root,
        type: type
      })
      props.handleExerciseAdded()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
    props.toggleModal()
  }

  return (
  <div className='new-exercise-modal'>
    <h3>Add exercise</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="exercise-name">Exercise name</label>
        <input 
          type="text" 
          id="exercise-name"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="exercise-category">Category</label>
        <select 
          id="exercise-category"
          value={category}
          onChange={handleCategoryChange}>
          <option value="">-- Choose exercise category --</option>
          <option value="strength">Strength</option>
          <option value="calisthenics">Calisthenics</option>
          <option value="cardio">Cardio</option>
        </select>
        <details>
          <summary>Primary muscles</summary>
            <fieldset>
              <ul>
                {muscles.map(muscle => (
                  <li key={muscle}>
                    <label htmlFor={muscle}>{muscle}</label>
                    <input type="checkbox" 
                      id={muscle} 
                      value={muscle} 
                      checked={primaryMuscles.includes(muscle)}
                      onChange={handlePrimaryMusclesChange}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
        </details>

        <details>
          <summary>Secondary muscles</summary>
            <fieldset>
              <ul>
                {muscles.map(muscle => (
                  <li key={muscle}>
                    <label htmlFor={`secondary-${muscle}`}>{muscle}</label>
                    <input type="checkbox" 
                      id={`secondary-${muscle}`} 
                      value={muscle} 
                      checked={secondaryMuscles.includes(muscle)}
                      onChange={handleSecondaryMusclesChange}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
        </details>
        <button className='btn btn-primary'>Add exercise</button>
      </form>
    </div>
  )
}

export default AddExerciseModal