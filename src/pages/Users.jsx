import { React, useContext } from 'react'
import UserContext from '../UserContext.jsx'
import { Link } from 'react-router-dom'


export default function Users() {
  const { users } = useContext(UserContext)

  return (
    <main>
      <h2 className='margin-bottom-1'>Find users</h2>
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
              <div className='find-friends--user-banner' key={user.id}>
                <Link to={user.id}>
                  <div className='find-friends--user-wrapper'>
                    <img className='find-friends--user-img' src={user.photoURL || '/assets/default.webp'} alt={user.displayName} />
                    <div className='find-friends--user-details'>
                        <p className='white small bold'>{user.displayName || user.email}</p>
                        <p className='small'>{user.email}</p>
                    </div>
                  </div>
                </Link>
                <button className='btn-follow'>Follow</button>
              </div>
          ))}
        </div>
      ) : (
        <p>There are no friends here... Booo!</p>
      )}
    </main>
  )
}