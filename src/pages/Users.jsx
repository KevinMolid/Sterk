import { React, useContext, useState, useEffect } from 'react'
import UserContext from '../UserContext.jsx'
import { Link } from 'react-router-dom'
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../config.jsx'

export default function Users() {
  const { user, userInDb, users } = useContext(UserContext)
  const [followingList, setFollowingList] = useState(userInDb?.following || [])

  useEffect(() => {
    setFollowingList(userInDb?.following || [])
  }, [userInDb])

  const follow = async (userToFollow) => {
    const newFollowingList = followingList.includes(userToFollow.id) 
      ? followingList.filter(id => id !== userToFollow.id)  // Unfollow if already following
      : [...followingList, userToFollow.id]  // Follow if not already following
  
    try {
      await updateDoc(doc(db, "users", user.uid), {
        following: newFollowingList
      })
      setFollowingList(newFollowingList)
    } catch (error) {
      console.error("Error updating follow status: ", error)
    }
  }

  return (
    <main>
      <h2 className='margin-bottom-1'>Find users</h2>
      {users.length > 0 ? (
        <div>
          {users.map((userObj) => {
            const isFollowing = followingList.includes(userObj.id)

            return (
              <div className='find-friends--user-banner' key={userObj.id}>
                <Link to={userObj.id}>
                  <div className='find-friends--user-wrapper'>
                    <img className='find-friends--user-img' src={userObj.photoURL || '/assets/default.webp'} alt={userObj.displayName} />
                    <div className='find-friends--user-details'>
                        <p className='white small bold'>{userObj.displayName || userObj.email}</p>
                        <p className='small'>{userObj.email}</p>
                    </div>
                  </div>
                </Link>
                <button className={`btn-follow ${isFollowing ? 'following' : ''}`} 
                  onClick={() => follow(userObj)}>
                    {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
          )})}
        </div>
      ) : (
        <p>There are no friends here... Booo!</p>
      )}
    </main>
  )
}