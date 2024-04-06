import React from 'react'
import Card from '/src/components/Card'

function Home() {
    return (
      <main>
        <section>
          <h2>Weekly stats</h2>
          <div className='grid-3-col margin-bottom-1'>
            <div>
              <small>Workouts</small>
              <p className='large'>0</p>
            </div>
            <div>
              <small>Sets</small>
              <p className='large'>0</p>
            </div>
            <div>
              <small>Time</small>
              <p className='large'>0m 0s</p>
            </div>
          </div>
          
        </section>
        <Card>
          <p>Kevin Molid</p>
          <small>Yesterday at 8:13 PM</small>
          <h3>Strength: BP and squats</h3>
          <p>Blah blah</p>
        </Card>
      </main>
    )
  }
  
  export default Home