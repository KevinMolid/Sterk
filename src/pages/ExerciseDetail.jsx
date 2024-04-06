import { React, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
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
        <main>
            <h2>{exercise.name}</h2>
            <p>{exercise.category}</p>
            <p>{exercise.primaryMuscles.join(', ')}</p>
            <p>{exercise.secondaryMuscles.join(', ')}</p>

        </main>
    )
}