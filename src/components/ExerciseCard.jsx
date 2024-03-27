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
            <img className ="exercise--title-img" src="/assets/exercises/bp.webp" alt="" />
            <div>
                <h3 className='exercise--title'>{exercise.name} 
                    {!expanded && <i className="exercise--caret fa-solid fa-caret-down"></i>}
                    {expanded && <i className="exercise--caret fa-solid fa-caret-up"></i>}
                </h3>
                <p className='exercise--title-p'>{exercise.primaryMuscles.join(', ')}</p>
            </div>
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