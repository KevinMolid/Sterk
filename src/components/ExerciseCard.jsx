import React from 'react'

function ExerciseCard(props) {
    const [expanded, setExpanded] = React.useState(false)

    function toggleExpanded() {
        setExpanded(prevState => !prevState)
    }

    const exercise = props.exercise
    return (
    <>
        <div className='exercise--title-wrapper' onClick={toggleExpanded}>
            <h3 className='exercise--title'>{exercise.name} 
                {!expanded && <i className="exercise--caret fa-solid fa-caret-down"></i>}
                {expanded && <i className="exercise--caret fa-solid fa-caret-up"></i>}
            </h3>
        </div>
        {expanded &&
        <div>
            <p><span className='bold white'>Category:</span> {exercise.category}</p>
            <div className='exercise--imgs'>
                {exercise.primaryMuscles && <img className='exercise--illustration' src='/assets/BodyIllustration.png'/>}
            </div>
            <p><span className='bold white'>Primary muscles:</span> {exercise.primaryMuscles.join(', ')}</p>
            <p><span className='bold white'>Secondary muscles:</span> {exercise.secondaryMuscles.join(', ')}</p>
        </div>
        }
      </>
    )
}

export default ExerciseCard