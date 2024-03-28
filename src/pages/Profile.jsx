import React, { useState, useEffect } from 'react'
import AddPrModal from '../components/AddPrModal'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config.jsx'


function Profile({ user, exercises }) {
  const [prModalExpanded, setPrModalExpanded] = useState(false)
  const [prs, setPrs] = useState([])

  useEffect(() => {
    const getPrs = async () => {
      const userPrs = await fetchUserPRs(user.uid);
      setPrs(userPrs);
    };

    if (user.uid) {
      getPrs();
    }
  }, [user]);

  async function fetchUserPRs(userId) {
    // Reference to the user's document in the 'users' collection
    const userRef = doc(db, 'users', userId);
  
    try {
      // Attempt to fetch the document
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        return docSnap.data().PRs; // Return the PRs field
      } else {
        return []; // Consider returning an empty array or null based on your app's needs
      }
    } catch (error) {
      console.error("Error fetching user PRs:", error);
      return []; // Consider how you want to handle errors, possibly returning an empty array or null
    }
  }

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
        <div className='flex-gap margin-bottom-1'>
          <div>
            <p className='small green'>Following</p>
            <p className='large white'>0</p>
          </div>
          <div>
            <p className='small green'>Followers</p>
            <p className='large white'>0</p>
          </div>
        </div>
        <div>
          <h3 className='margin-bottom-1'>Statistics</h3>
          <div className='margin-bottom-1'>
            <h4>Estimated 1RM</h4>
            <p>Bench press: 80 kg</p>
          </div>
          <div className="flex-space">
            <h4>All-time 1RM PRs</h4>
            <button className='btn-txt' onClick={togglePrModal}>Add PR</button>
          </div>
          {prModalExpanded && <AddPrModal user={user} exercises={exercises}/>}
          <p className="flex-space"><span>Bench press</span>77.5 kg</p>
          {prs.map((pr, index) => (
            <div key={index}>
              <p className="flex-space"><span>{pr.name}</span> {pr.value} kg</p>
            </div>
          ))}
        </div>
      </main>
    )
  }
  
  export default Profile