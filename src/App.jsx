import './App.css'
import React, { useEffect, useState } from 'react'

// Components
import Header from './components/Header'
import Navbar from './components/NavBar'
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

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // State to trigger refresh of exercise list
  const [refreshExercises, setRefreshExercises] = useState(false)

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

  // sign up
  function authCreateAccountWithEmail(event) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('pw').value

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setUser(user)      })
      .catch((error) => {
        console.error(error)
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
        setUser(user)
      })
      .catch((error) => {
        console.error(error)
      })
  }

    // Sign in with google
    function authSignInWithGoogle(event) {
      event.preventDefault()
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        setUser(user)
      }).catch((error) => {
        console.log(error)
      });
    }

  function authSignOut() {
    const auth = getAuth();
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
            <input 
              className="signIn--input margin-bottom-1" 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email"
              required
              />
            <input 
              className="signIn--input" 
              type="password" 
              name="pw" 
              id="pw" 
              placeholder="Password"
              required
              />
            <p className='signIn--p'>Forgot password?</p>
            <button className="btn btn-primary margin-bottom-1" onClick={authSignInWithEmail}>Sign in</button>
            <button className="btn btn-secondary margin-bottom-2" onClick={authCreateAccountWithEmail}>Create account</button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className='loading'>Loading...</div>; // Show loading screen while auth state is loading
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
            <Route path="/exercises" element={<Exercises 
              refreshFlag={refreshExercises}
              handleExerciseAdded={handleExerciseAdded}/>} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/profile" element={<Profile user={user}/>} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
          <Navbar />
        </>
        }
      </div>
    </Router>
  )
}

// Placeholder Home component
function Home() {
  return (
    <main>
      <h2>Welcome to Sterk!</h2>
      <a href="/workouts"><button className='btn btn-primary'>Start workout <i className="btn-icon fa-solid fa-chevron-right"></i></button></a>
      <a href="/exercises"><button className='btn btn-secondary'>Browse exercises <i className="btn-icon fa-solid fa-chevron-right"></i></button></a>
      <a href="/progress"><button className='btn btn-secondary'>Track your progress <i className="btn-icon fa-solid fa-chevron-right"></i></button></a>
    </main>
  )
}

export default App
