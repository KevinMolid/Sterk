import React, { useState } from 'react'

function CreateWorkout() {
    const [workoutName, setWorkoutName] = useState('New workout')
    const [description, setDescription] = useState('')


    // Handle changes in input fields
    const handleNameChange = (event) => {
        setWorkoutName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
  }

    return (
      <main>
        <form action="">
            <input className="create-workout--workout-name margin-bottom-1" 
                type="text" 
                value={workoutName} 
                onChange={handleNameChange}/>
            <label className="small grey" htmlFor="workout-description">Description</label>
            <textarea id="workout-description" 
              value={description}
              onChange={handleDescriptionChange}></textarea>
            <button className='btn-txt'>Add exercise</button>
        </form>
      </main>
    )
  }
  
  export default CreateWorkout