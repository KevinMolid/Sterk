import { React, useState } from 'react'
import ExerciseList from '../components/ExerciseList.jsx'
import { Link } from 'react-router-dom'

function CreateWorkout() {
    const [workoutName, setWorkoutName] = useState('New workout')
    const [description, setDescription] = useState('')
    const [workoutExercises, setWorkoutExercises] = useState([])
    const [choosingExercise, setChoosingExercise] = useState(false)

    // Handle changes in input fields
    const handleNameChange = (event) => {
        setWorkoutName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
    }

    const addExercise = (exercise) => {
      const newExercise = {
        exercise: exercise.id,
        name: exercise.name,
        id: workoutExercises.length.toString(), // Simple ID generation
        sets: [
          { reps: 10, weight: 0 }, // Example set
          // Add more sets as needed
        ]
      }
      setWorkoutExercises(prevExercises => [...prevExercises, newExercise])
      setChoosingExercise(prevState => !prevState)
    }

    const addSet = (exerciseId) => {
      setWorkoutExercises(currentExercises => {
        return currentExercises.map(exercise => {
            if (exercise.id === exerciseId) {
                return {
                    ...exercise,
                    sets: [
                        ...exercise.sets,
                        { reps: 10, weight: 40 } // Default values for the new set
                    ]
                }
            }
            return exercise
        })
    })}

    const updateSet = (exerciseId, setIndex, updatedValues) => {
        setWorkoutExercises(currentExercises => {
            return currentExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.map((set, index) => {
                        if (index === setIndex) {
                            return { ...set, ...updatedValues }
                        }
                        return set
                    })
                    return { ...exercise, sets: updatedSets }
                }
                return exercise
            })
        })
    }

    const chooseExercise = (event) => {
      event.preventDefault()
      setChoosingExercise(prevState => !prevState)
    }

    function addWorkout(){
      console.log(workoutName)
      console.log(description)
      console.log(workoutExercises)
    }

    return (
      <main>
        {choosingExercise && (<ExerciseList addExercise={addExercise} />)}
        <div className='margin-bottom-1'>
          <Link className="link" 
              to={`/workouts`}>
              <i className="fa-solid fa-arrow-left"></i> {`Back to workouts`}
          </Link>
        </div>
        <form>
            <input className="create-workout--workout-name margin-bottom-1" 
                type="text" 
                value={workoutName} 
                onChange={handleNameChange}/>
            <label className="small grey" htmlFor="workout-description">Description</label>
            <textarea id="workout-description" 
              value={description}
              onChange={handleDescriptionChange}></textarea>
            <button className='btn-txt margin-bottom-1' 
              onClick={chooseExercise}>
                Add Exercise
              </button>
        </form>

        {/* Render exercises */}
        {workoutExercises.map((exercise, index) => {
            return (
              <div key={index}>
              <div className='flex-gap'>
                <h3>{exercise.name}</h3>
                <button className='btn-txt' onClick={() => addSet(exercise.id)}>Add Set</button>
              </div>

              {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="set">
                      Set {setIndex + 1}: 
                      <input
                          className='set-input'
                          type="number"
                          value={set.reps}
                          onChange={(e) => updateSet(exercise.id, setIndex, { reps: parseInt(e.target.value, 10) })}
                          style={{ marginInline: '10px' }}
                      /> reps of
                      <input
                          className='set-input'
                          type="number"
                          value={set.weight}
                          onChange={(e) => updateSet(exercise.id, setIndex, { weight: parseInt(e.target.value, 10) })}
                          style={{ marginInline: '10px' }}
                      /> kg
                  </div>
              ))}

            </div>
        )})}

        <button 
          className='btn btn-primary margin-top-1'
          onClick={addWorkout}>
            Publish workout
        </button>
      </main>
    )
  }
  
  export default CreateWorkout