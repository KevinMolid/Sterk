import React, { useState } from 'react'
import AddPrModal from '../components/AddPrModal'

function Profile({ user }) {
  const [prModalExpanded, setPrModalExpanded] = useState(false)

  function togglePrModal() {
    setPrModalExpanded(prevState => !prevState)
  }

    return (
      <main>
        <h2 className="profile--heading">Profile</h2>
        <div className="profile--user-wrapper">
            <img className="profile--user-img" src={user.photoURL} alt="profile image" />
            <div>
                <h3>{user.displayName}</h3>
                <p>{user.email}</p>
            </div>
        </div>
        <h3 className='margin-bottom-1'>Statistics</h3>
        <div className='margin-bottom-1'>
          <h4>Estimated 1RM</h4>
          <p>Bench press: 80 kg</p>
        </div>
        <div className="flex-space">
          <h4>All-time 1RM PRs</h4>
          <button className='btn-txt' onClick={togglePrModal}>Add PR</button>
        </div>
        {prModalExpanded && <AddPrModal />}
        <p className="flex-space"><span>Bench press</span>77.5 kg</p>
      </main>
    )
  }
  
  export default Profile