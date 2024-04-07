import { React, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import UserContext from '../UserContext'

export default function ProfileLayout() {
    const { user, setUser, exercises } = useContext(UserContext)

    return (
        <main>
            <h2 className="profile--heading">Profile</h2>
            <div className="profile--user-wrapper">
                <img className="profile--user-img" src={user.photoURL || '/assets/default.webp'} alt="profile image" />
                <div>
                    <h3>{user.displayName || user.email}</h3>
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
            {/* Navigation */}
            <nav className='nav'>
                <Link to="/profile/"><p className='margin-bottom-1'>Activities</p></Link>
                <Link to="/profile/stats"><p className='margin-bottom-1'>Statistics</p></Link>
            </nav>
            <Outlet />
        </main>
    )
}