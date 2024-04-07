import React from 'react'
import { Outlet } from 'react-router-dom'
import { authSignOut } from '/src/functions/authFunctions'

// Components
import Header from './Header'
import Navbar from './NavBar'

export default function Layout() {
    return (
        <>
            <Header signOut={authSignOut} />
            <Outlet />
            <Navbar />
        </>
    )
}