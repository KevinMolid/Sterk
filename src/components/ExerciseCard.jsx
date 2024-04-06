import React from 'react'

function ExerciseCard(props) {

    const exercise = props.exercise
    return (
    <>
        <div className='exercise--title-wrapper'>
            <img className ="exercise--title-img" src="/assets/exercises/bp.webp" alt="" />
            <div>
                <h3 className='exercise--title'>{exercise.name} 
                </h3>
                <p className='exercise--title-p'>{exercise.primaryMuscles.join(', ')}</p>
            </div>
        </div>
    </>
    )
}

export default ExerciseCard