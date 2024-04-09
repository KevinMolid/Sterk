import { React, useState, useEffect, useContext } from 'react'
import AddPrModal from '../../components/AddPrModal.jsx'
import UserContext from '../../UserContext.jsx'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config.jsx'

export default function UserStats() {
    const { user, exercises } = useContext(UserContext)
    const [prModalExpanded, setPrModalExpanded] = useState(false)
    const [prs, setPrs] = useState([])
    const [updatePrsFlag, setUpdatePrsFlag] = useState(false)

    useEffect(() => {
        const getPrs = async () => {
          const userPrs = await fetchUserPRs(user.uid)
          setPrs(userPrs)
        }
    
        if (user.uid) {
          getPrs()
        }
      }, [user, updatePrsFlag])
    
      function updatePrs() {
        setUpdatePrsFlag(prevFlag => !prevFlag)
      }
    
      async function fetchUserPRs(userId) {
        // Reference to the user's document in the 'users' collection
        const userRef = doc(db, 'users', userId)
      
        try {
          // Attempt to fetch the document
          const docSnap = await getDoc(userRef)
      
          if (docSnap.exists()) {
            return docSnap.data().PRs // Return the PRs field
          } else {
            return [] // Consider returning an empty array or null based on your app's needs
          }
        } catch (error) {
          console.error("Error fetching user PRs:", error)
          return [] // Consider how you want to handle errors, possibly returning an empty array or null
        }
      }

    function togglePrModal() {
        setPrModalExpanded(prevState => !prevState)
      }

    return (
    <div>
        <div className='margin-bottom-1'>
        <h4>Estimated 1RM</h4>
        <p>Not yet implemented</p>
      </div>
      <div className="flex-space">
        <h4>All-time 1RM PRs</h4>
        <button className='btn-txt' onClick={togglePrModal}>Add PR</button>
      </div>
      {prModalExpanded && <AddPrModal 
        updatePrs={updatePrs} 
        togglePrModal={togglePrModal}
        user={user} 
        exercises={exercises}/>}
      {prs.length > 0 ? (
        prs.map((pr, index) => (
          <div key={index}>
            <p className="flex-space"><span>{pr.name}</span> {pr.value} kg</p>
          </div>
        ))
      ) : (
        <p>You have no PRs</p>
      )}
    </div>
    )
}