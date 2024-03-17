import './App.css'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Navbar from './components/NavBar'
import Exercises from './pages/Exercises'
import Workouts from './pages/Workouts'
import Progress from './pages/Progress'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import sterkLogo from '/src/assets/logoBlack.png'

// Firebase
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAgCPUoe9DyIhBeHrHwWjAsSgVqdt2qZRY",
  authDomain: "sterk-1cc56.firebaseapp.com",
  projectId: "sterk-1cc56",
  storageBucket: "sterk-1cc56.appspot.com",
  messagingSenderId: "1053630322021",
  appId: "1:1053630322021:web:5779880d99cfd1d230bd8c"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
        setUser(user)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Sign in
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
          <h2 className="signIn--h2">LOG IN</h2>
          <button className="btn btn-secondary margin-bottom-2">Log in with Google</button>
          <form>
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
            <button className="btn btn-primary margin-bottom-1" onClick={authSignInWithEmail}>Log in</button>
            <button className="btn btn-secondary margin-bottom-2" onClick={authCreateAccountWithEmail}>Sign up</button>
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
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/progress" element={<Progress />} />
            {/* Add more routes as needed */}
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
