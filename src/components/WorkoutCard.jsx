import React from 'react'

function WorkoutCard() {
    const [expanded, setExpanded] = React.useState(false)

    function toggleExpanded() {
        setExpanded(prevState => !prevState)
    }

    return (
        <div className='workout-card'>
            <h3>Stronglifts 5x5 (workout A)</h3>
            <ul className='workout-card--exercises-ul'>
                <li className='workout-card--exercise-li'>
                    <span className='bold'>Squats</span> <span>5x5 60kg</span>
                </li>
                <li className='workout-card--exercise-li'>
                    <span className='bold'>Bench press</span> <span>5x5 60kg</span>
                </li>
                <li className='workout-card--exercise-li'>
                    <span className='bold'>Barbell row</span> <span>5x5 60kg</span>
                </li>
            </ul>
            <button className='btn btn-primary'>Start workout</button>
        </div>
    )
}

export default WorkoutCard