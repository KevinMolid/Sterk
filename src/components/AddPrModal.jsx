import React from 'react'

function AddPrModal() {

    function togglePrModal() {
        console.log('toggle')
    }

    return (
        <div className='add-pr-modal'>
            <button className='btn-close' onClick={togglePrModal}>
                <i className="fa-solid fa-x"></i>
            </button>
            <h3>Add PR</h3>
            <form action="">
                <select name="select-pr" id="select-pr">
                    <option value="">-- Choose exercise --</option>
                    <option value="Squat">Squat</option>
                    <option value="Bench press">Bench press</option>
                    <option value="Deadlift">Deadlift</option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
                <input type="number" />
                <button className='btn btn-primary'>Add PR</button>
            </form>
        </div>
    )
}

export default AddPrModal