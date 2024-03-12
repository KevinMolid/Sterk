import './App.css'
import Header from './components/Header'
import Navbar from './components/NavBar'
import Exercises from './components/Exercises'
import Workouts from './components/Workouts'
import Progress from './components/Progress'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/progress" element={<Progress />} />
          {/* Add more routes as needed */}
        </Routes>
        <Navbar />
      </div>
    </Router>
  )
}

// Placeholder Home component
function Home() {
  return (
    <main>
      <h2>Welcome to Sterk!</h2>
      <a href="/workouts"><button className='btn btn-primary'>Find a workout <i className="btn-icon fa-solid fa-chevron-right"></i></button></a>
      <a href="/workouts"><button className='btn btn-secondary'>Find an exercise <i className="btn-icon fa-solid fa-chevron-right"></i></button></a>
    </main>
  )
}

export default App
