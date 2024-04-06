import './App.css'
import React, { useEffect, useState } from 'react'
import { authSignOut } from '/src/functions/authFunctions'

import SignIn from './pages/SignIn'

// Components
import Header from './components/Header'
import Navbar from './components/NavBar'

// Pages
import Home from './pages/Home'
import FindFriends from './pages/FindFriends'
import Exercises from './pages/Exercises'
import ExerciseDetail from './pages/ExerciseDetail'
import Workouts from './pages/Workouts'
import CreateWorkout from './pages/CreateWorkout'
import Profile from './pages/Profile'
import Progress from './pages/Progress'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { onAuthStateChanged } from "firebase/auth"

import { auth, provider, db } from './config.jsx'

// Firebase Firestore
import { doc, getDoc, getDocs, setDoc,
  collection } from "firebase/firestore"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [exercises, setExercises] = useState([])
  // State to trigger refresh of exercise list
  const [refreshExercises, setRefreshExercises] = useState(false)

  useEffect(() => {
    const fetchExercises = async () => {
      const querySnapshot = await getDocs(collection(db, "exercises"))
      const exercisesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const alphabeticalExercisesList = exercisesList.sort(function(a, b) {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        } else {
          return 0
        }
      })
      setExercises(alphabeticalExercisesList)
    }
    fetchExercises()
  }, [refreshExercises]) // re-fetches when flagged

  // Callback function to trigger refresh
  const handleExerciseAdded = () => {
    setRefreshExercises(prev => !prev)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className='loading'>Loading...</div> // Show loading screen while auth state is loading
  }

  return (
    <Router>
      <div className="app">
        {!user && <SignIn/>}
        {user && 
        <>
          <Header signOut={authSignOut} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findfriends" element={<FindFriends />} />
            <Route path="/exercises" element={<Exercises 
              refreshFlag={refreshExercises}
              handleExerciseAdded={handleExerciseAdded}
              exercises={exercises} />} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/createworkout" element={<CreateWorkout />} />
            <Route path="/profile" element={<Profile 
              user={user} 
              exercises={exercises}/>} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
          <Navbar />
        </>
        }
      </div>
    </Router>
  )
}

export default App
