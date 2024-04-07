import { React, useContext } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
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

            {/* Followers */}
            <div className='flex-gap margin-bottom-2'>
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
            <nav className='nav border-bottom-1'>
                <NavLink to="/profile"
                    className={({isActive}) => isActive ? 'nav-active' : null} end>
                    <p className='margin-bottom-1'>Activities</p>
                </NavLink>
                <NavLink to="/profile/stats"
                    className={({isActive}) => isActive ? 'nav-active' : null}>
                    <p className='margin-bottom-1'>Statistics</p>
                </NavLink>
            </nav>
            <Outlet />
        </main>
    )
}