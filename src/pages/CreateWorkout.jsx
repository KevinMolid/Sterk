import React, { useState } from 'react'
import Exercise from '../components/ChooseExercise.jsx'

function CreateWorkout() {
    const [workoutName, setWorkoutName] = useState('New workout')
    const [description, setDescription] = useState('')
    const [exercises, setExercises] = useState([])

    // Handle changes in input fields
    const handleNameChange = (event) => {
        setWorkoutName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
    }

    const addExercise = (event) => {
      event.preventDefault()
      setExercises(prevExercises => {
        const key = prevExercises.length
        return [...prevExercises, <Exercise key={key}/>]
      })
    }

    return (
      <main>
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
        {exercises}
      </main>
    )
  }
  
  export default CreateWorkout