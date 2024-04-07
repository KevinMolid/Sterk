import './App.css'
import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from './config.jsx'
import UserContext from './UserContext'

// Layouts
import Layout from './components/Layout'
import ProfileLayout from './components/ProfileLayout'

// Pages
import Home from './pages/Home'
import FindFriends from './pages/FindFriends'
import Exercises from './pages/Exercises'
import ExerciseDetail from './pages/ExerciseDetail'
import Workouts from './pages/Workouts'
import CreateWorkout from './pages/CreateWorkout'
import Progress from './pages/Progress'
import SignIn from './pages/SignIn'
import UserActivities from './pages/Profile/UserActivities'
import UserStats from './pages/Profile/UserStats'


// Firebase Firestore
import { getDocs,
  collection } from "firebase/firestore"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [exercises, setExercises] = useState([])
  // State to trigger refresh of exercise list
  const [refreshExercises, setRefreshExercises] = useState(false)

  // Fetch exercises from database 
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
    <UserContext.Provider value={{ user, setUser, exercises }}>
      <Router>
      <div className="app">
        {!user && <SignIn/>}
        {user && 
        <>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="findfriends" element={<FindFriends />} />
              <Route path="exercises" element={<Exercises 
                refreshFlag={refreshExercises}
                handleExerciseAdded={handleExerciseAdded}
                exercises={exercises} />} />
              <Route path="exercises/:id" element={<ExerciseDetail />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="createworkout" element={<CreateWorkout 
                exercisesFromDb={exercises}/>} />

              {/* Profile page */}
              <Route path='profile' element={<ProfileLayout />}>
                <Route index element={<UserActivities />} />
                <Route path="stats" element={<UserStats />} />
              </Route>

              <Route path="progress" element={<Progress />} />
            </Route>
          </Routes>
        </>
        }
      </div>
    </Router>
    </UserContext.Provider>
  )
}

export default App
