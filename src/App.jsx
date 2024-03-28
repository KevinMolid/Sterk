import './App.css'
import React, { useEffect, useState } from 'react'

// Components
import Header from './components/Header'
import Navbar from './components/NavBar'

// Pages
import Home from './pages/Home'
import FindFriends from './pages/FindFriends.jsx'
import Exercises from './pages/Exercises'
import Workouts from './pages/Workouts'
import Profile from './pages/Profile'
import Progress from './pages/Progress'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import sterkLogo from '/src/assets/logoBlack.png'

import { getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  signInWithPopup } from "firebase/auth"

import { auth, provider, db } from './config.jsx'

// Firebase Firestore
import { doc, getDoc, getDocs, setDoc,
  collection } from "firebase/firestore"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [exercises, setExercises] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
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

  // Create user profile in firestore users db
  const createUserProfile = async (user) => {
    const userProfileRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(userProfileRef)
  
    if (!docSnap.exists()) {
      await setDoc(userProfileRef, {
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        email: user.email || '',
        PRs: [],
      }, { merge: true })
    }
  }

  // sign up
  function authCreateAccountWithEmail(event) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('pw').value

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setErrorMsg('')
        setUser(user)
        createUserProfile(user)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

  // Sign in with email
  function authSignInWithEmail(event) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('pw').value

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        setErrorMsg('')
        setUser(user)
        createUserProfile(user)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      })
  }

    // Sign in with google
    function authSignInWithGoogle(event) {
      event.preventDefault()
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        setErrorMsg('')
        setUser(user)
        createUserProfile(user)
      }).catch((error) => {
        setErrorMsg(error.message)
      })
    }

  function authSignOut() {
    const auth = getAuth()
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.error(error)
    })
  }

  // Sign in component
  function SignIn() {
    return (
      <div className="signIn">
        <div className='signIn--logo-wrapper'>
          <img className='signIn--logo-img' src={sterkLogo} alt="Sterk logo" />
          <span className='signIn--logo-txt'>Sterk</span>
        </div>
        <div className='signIn--card'>
          <h2 className="signIn--h2">SIGN IN</h2>
          <form>
          <button className="btn btn-provider margin-bottom-2" onClick={authSignInWithGoogle}>
            <img className="btn-img" src="/assets/googleLogo.png"/>
            Sign in with Google</button>

            <div className="signIn--input-wrapper">
              <span className="signIn--input-icon material-symbols-outlined">
                email
              </span>
              <input 
              className="signIn--input" 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email"
              required
              />
            </div>

            <div className="signIn--input-wrapper">
              <span className="signIn--input-icon material-symbols-outlined">
                key
              </span>
              <input 
              className="signIn--input" 
              type="password" 
              name="pw" 
              id="pw" 
              placeholder="Password"
              required
              />
            </div>
            <p className='signIn--p small'>Forgot password?</p>
            <div>
              <p className='signIn--error-msg red'>{errorMsg}</p>
            </div>
            <button className="btn btn-primary margin-bottom-1" onClick={authSignInWithEmail}>Sign in</button>
            <button className="btn btn-secondary margin-bottom-2" onClick={authCreateAccountWithEmail}>Create account</button>
          </form>
        </div>
      </div>
    )
  }

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
            <Route path="/workouts" element={<Workouts />} />
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
