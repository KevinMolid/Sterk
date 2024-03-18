import React from 'react'
import exercises from '../data/exercises.jsx'
import ExerciseCard from '../components/ExerciseCard.jsx'

const exercisesHTML = exercises.map(exercise => {

  return (
    <ExerciseCard key={exercise.id} exercise={exercise} />
  )
})

function Exercises() {
    return (
      <main>
        <div className='exercises--heading-wrapper'>
          <h2>Exercises</h2>
          <button className='btn btn-primary btn-small'><i class="fa-solid fa-plus"></i></button>
        </div>
        <div className='new-exercise-modal'>
          <h3>Add exercise</h3>
            <form action="">
              <label htmlFor="exercise-name">Exercise name</label>
              <input type="text" id="exercise-name"/>
              <label htmlFor="exercise-category">Category</label>
              <select name="category" id="exercise-category">
                <option value="standard">Strength</option>
                <option value="standard">Calisthenics</option>
                <option value="standard">Cardio</option>
              </select>
              <details>
                <summary>Primary muscles</summary>
                <form>
                  <fieldset>
                    <legend>
                      Cars
                    </legend>
                    <ul>
                      <li>
                        <label for="primary-chest">Chest</label>
                        <input type="checkbox" id="primary-chest" name="chest" value="chest" />
                      </li>
                      <li>
                        <label for="primary-shoulders">Shoulders</label>
                        <input type="checkbox" id="primary-shoulders" name="shoulders" value="shoulders" />
                      </li>
                      <li>
                        <label for="primary-legs">Legs</label>
                        <input type="checkbox" id="primary-legs" name="legs" value="legs" />
                      </li>
                      <li>
                        <label for="primary-back">Back</label>
                        <input type="checkbox" id="primary-back" name="back" value="back" />
                      </li>
                      <li>
                        <label for="primary-traps">Traps</label>
                        <input type="checkbox" id="primary-traps" name="traps" value="traps" />
                      </li>
                      <li>
                        <label for="primary-biceps">Biceps</label>
                        <input type="checkbox" id="primary-biceps" name="biceps" value="biceps" />
                      </li>
                      <li>
                        <label for="primary-triceps">Triceps</label>
                        <input type="checkbox" id="primary-triceps" name="triceps" value="triceps" />
                      </li>
                    </ul>
                  </fieldset>
                </form>
              </details>

              <details>
                <summary>Secondary muscles</summary>
                <form>
                  <fieldset>
                    <legend>
                      Cars
                    </legend>
                    <ul>
                      <li>
                        <label for="secondary-chest">Chest</label>
                        <input type="checkbox" id="secondary-chest" name="chest" value="chest" />
                      </li>
                      <li>
                        <label for="secondary-shoulders">Shoulders</label>
                        <input type="checkbox" id="secondary-shoulders" name="shoulders" value="shoulders" />
                      </li>
                      <li>
                        <label for="secondary-legs">Legs</label>
                        <input type="checkbox" id="secondary-legs" name="legs" value="legs" />
                      </li>
                      <li>
                        <label for="secondary-back">Back</label>
                        <input type="checkbox" id="secondary-back" name="back" value="back" />
                      </li>
                      <li>
                        <label for="secondary-traps">Traps</label>
                        <input type="checkbox" id="secondary-traps" name="traps" value="traps" />
                      </li>
                      <li>
                        <label for="secondary-biceps">Biceps</label>
                        <input type="checkbox" id="secondary-biceps" name="biceps" value="biceps" />
                      </li>
                      <li>
                        <label for="secondary-triceps">Triceps</label>
                        <input type="checkbox" id="secondary-triceps" name="triceps" value="triceps" />
                      </li>
                    </ul>
                  </fieldset>
                </form>
              </details>
              <button className='btn btn-primary'>Add exercise</button>
            </form>
          </div>
        {exercisesHTML}
      </main>
    )
  }
  
  export default Exercises