import React, { useState } from 'react'
import Exercise from '../components/ChooseExercise.jsx'
import ExerciseList from '../components/ExerciseList.jsx'

function CreateWorkout(exercisesFromDb) {
    const [workoutName, setWorkoutName] = useState('New workout')
    const [description, setDescription] = useState('')
    const [availableExercises, setAvailableExercises] = useState(exercisesFromDb)
    const [exercises, setExercises] = useState([])
    const [choosingExercise, setChoosingExercise] = useState(false)

    // Handle changes in input fields
    const handleNameChange = (event) => {
        setWorkoutName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
    }

    const addExercise = (event) => {
      event.preventDefault()
      const newExercise = {
        id: exercises.length.toString(), // Simple ID generation
        sets: [
          { reps: 10, weight: 40 }, // Example set
          // Add more sets as needed
        ]
      }

      setExercises(prevExercises => [...prevExercises, newExercise])
    }

    return (
      <main>
        {choosingExercise && (<ExerciseList exercisesFromDb={exercisesFromDb}/>)}
        <form>
            <input className="create-workout--workout-name margin-bottom-1" 
                type="text" 
                value={workoutName} 
                onChange={handleNameChange}/>
            <label className="small grey" htmlFor="workout-description">Description</label>
            <textarea id="workout-description" 
              value={description}
              onChange={handleDescriptionChange}></textarea>
            <button className='btn-txt' onClick={addExercise}>Add exercise</button>
        </form>
        {/* Render exercises */}
        {exercises.map((exercise, index) => (
          <div key={index}>
            <h3>Exercise {index + 1}</h3>
            {exercise.sets.map((set, setIndex) => (
              <p key={setIndex}>Set {setIndex + 1}: {set.reps} reps at {set.weight} lbs</p>
            ))}
          </div>
        ))}
      </main>
    )
  }
  
  export default CreateWorkout