import { React, useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import Badge from '../components/Badge'
import { db } from '../config'

export default function ExerciseDetail(){
    const [exercise, setExercise] = useState('')
    const exerciseId = useParams().id

    useEffect(() => {
        fetchExerciseById(exerciseId)
            .then((exercise) => {
                setExercise(exercise)
            })
            .catch((error) => {
                throw error
            })
    }, [exerciseId])

    async function fetchExerciseById(exerciseId) {
        const exerciseRef = doc(db, "exercises", exerciseId)
        try {
            const docSnap = await getDoc(exerciseRef)
            if (docSnap.exists()) {
                return docSnap.data() // Returns the exercise data if found
            } else {
                console.log("No such exercise!")
                return null // Handle the case where the exercise does not exist
            }
        } catch (error) {
            console.error("Error fetching exercise:", error)
            throw error // Optionally re-throw the error for further handling
        }
    }

    return (
        exercise && (
            <main>
                <div className='margin-bottom-1'>
                    <Link className="link" to=".."
                        relative="path" >
                        <i className="fa-solid fa-arrow-left"></i> Back to exercises
                    </Link>
                </div>
                <div className='flex-space margin-bottom-1'>
                    <h2>{exercise.name}</h2>
                    <Badge>{exercise.category}</Badge>
                </div>
                <p><span className='bold white'>Primary:</span> {exercise.primaryMuscles.join(', ')}</p>
                {exercise.secondaryMuscles[0] && <p><span className='bold white'>Secondary:</span> {exercise.secondaryMuscles.join(', ')}</p>}
            </main>
        )
    )
}