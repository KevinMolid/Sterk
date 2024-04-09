import { React, useState, useContext } from "react"
import { useParams, NavLink, Outlet } from "react-router-dom"
import UserContext from '../UserContext'

export default function UserDetail() {
    const userId = useParams().id
    const { users } = useContext(UserContext)
    const user = users.filter(usr => usr.id === userId)[0]

    return (
        <main>
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