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
                {exercise.img && <img className='exercise--img' src={exercise.img}/>}
                {exercise.bodyParts && <img className='exercise--illustration' src='/assets/BodyIllustration.png'/>}
            </div>
            <p><span className='bold white'>Muscles:</span> {exercise.bodyParts.join(', ')}</p>
        </div>
        }
      </>
    )
}

export default ExerciseCard