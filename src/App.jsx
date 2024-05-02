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
import Users from './pages/Users.jsx'
import UserDetail from './pages/UserDetail'
import Exercises from './pages/Exercises'
import ExerciseDetail from './pages/ExerciseDetail'
import Workout from './pages/Workout'
import Workouts from './pages/Workouts'
import CreateWorkout from './pages/CreateWorkout'
import Progress from './pages/Progress'
import SignIn from './pages/SignIn'
import UserActivities from './pages/Profile/UserActivities'
import UserStats from './pages/Profile/UserStats'
import NotFound from './pages/NotFound'


// Firebase Firestore
import { doc, getDoc, getDocs,
  collection } from "firebase/firestore"

function App() {
  const [user, setUser] = useState(null)
  const [userInDb, setUserInDb] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Exercises
  const [exercises, setExercises] = useState([])
  const [refreshExercises, setRefreshExercises] = useState(false)

  // Workouts
  const [workouts, setWorkouts] = useState([])
  const [refreshWorkouts, setRefreshWorkouts] = useState(false)

  // Active workout
  const [activeWorkout, setActiveWorkout] = useState(JSON.parse(localStorage.getItem('activeWorkout')))

  // Fetch user in firestore
  useEffect(() => {
    const fetchUserInDb = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          setUserInDb(docSnap.data()) // Set userInDb state with fetched data
        } else {
          console.log("No such user in db!")
          // Optionally, handle case where user doesn't exist in db (e.g., create a new document)
        }
      } else {
        setUserInDb(null) // Reset userInDb state when logged out
      }
    }

    fetchUserInDb()
  }, [user]) // This useEffect depends on the `user` state

  // Check if admin
  useEffect(() => {
    // Check if userInDb exists and has a truthy 'admin' field
    if (userInDb && userInDb.admin) {
      document.body.classList.add('admin')
    } else {
      document.body.classList.remove('admin')
    }
  }, [userInDb]) // Depend on userInDb to re-evaluate when it changes

  // Fetch users from firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"))
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setUsers(usersList)
    }

    fetchUsers()
  }, [])

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

  // Fetch workouts from database 
  useEffect(() => {
    const fetchWorkouts = async () => {
      const querySnapshot = await getDocs(collection(db, "workouts"))
      const workoutsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setWorkouts(workoutsList)
    }
    fetchWorkouts()
  }, [refreshWorkouts]) // re-fetches when flagged

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
    <UserContext.Provider value={{ user, setUser, userInDb, users, exercises, workouts, activeWorkout, setActiveWorkout }}>
      <Router>
      <div className="app">
        {!user && <SignIn/>}
        {user && 
        <>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="exercises" element={<Exercises 
                refreshFlag={refreshExercises}
                handleExerciseAdded={handleExerciseAdded}
                exercises={exercises} />} />
              <Route path="exercises/:id" element={<ExerciseDetail />} />
              <Route path="workout" element={<Workout />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="createworkout" element={<CreateWorkout 
                exercisesFromDb={exercises}/>} />

              {/* Profile page */}
              <Route path='profile' element={<ProfileLayout />}>
                <Route index element={<UserActivities />} />
                <Route path="stats" element={<UserStats />} />
              </Route>

              <Route path="progress" element={<Progress />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />}/>
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
