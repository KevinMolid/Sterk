import React, { useState } from 'react'
import { doc, getFirestore, runTransaction } from "firebase/firestore"

import { db } from '../config.jsx'

function AddPrModal({ user, exercises }) {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    function togglePrModal() {
        console.log('toggle')
    }

    // Handle changes in input fields
    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleValueChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = doc(db, 'users', user.uid);
    
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            
            // Check if the document exists
            if (!userDoc.exists()) {
                // If the user document does not exist, create it with the initial PR
                const initialPrs = [{ name, value: Number(value) }];
                transaction.set(userRef, { PRs: initialPrs });
                console.log('New user document created with initial PR.');
            } else {
                // If the document exists, update or add the PR in the PRs array
                let prs = userDoc.data().PRs || [];
                const prIndex = prs.findIndex(pr => pr.name === name);
    
                if (prIndex > -1) {
                    // Update existing PR
                    prs[prIndex].value = Number(value);
                } else {
                    // Add new PR
                    prs.push({ name, value: Number(value) });
                }
    
                // Update the user document with the new or updated PRs array
                transaction.update(userRef, { PRs: prs });
                console.log('User PR updated or added successfully.');
            }
        }).catch((error) => {
            console.error("Transaction failed: ", error);
        });
    };

    return (
        <div className='add-pr-modal'>
            <button className='btn-close' onClick={togglePrModal}>
                <i className="fa-solid fa-x"></i>
            </button>
            <h3 className='margin-bottom-1'>Add PR</h3>
            <form onSubmit={handleSubmit}>
                <div className='grid-2-col margin-bottom-1'>
                    <select 
                        name="select-pr" 
                        id="select-pr"
                        onChange={handleNameChange}>
                        {exercises.map(exercise => {
                            return (
                                <option key={exercise.id} value={exercise.name}>
                                    {exercise.name}
                                </option>
                            )
                        })}
                    </select>
                    <input type="number" onChange={handleValueChange} />
                </div>
                <button className='btn btn-primary'>Add PR</button>
            </form>
        </div>
    )
}

export default AddPrModal