import React from 'react'
import sterkLogo from '../assets/logo.png'

function Header() {
    return (
        <header className='header'>
            <a href='/'>
                <div className='header--logo-wrapper'>
                    <img className='header--logo-img' src={sterkLogo} alt="Sterk logo" />
                    <span className='header--logo-txt'>Sterk</span>
                </div>
            </a>
        </header>
    )
}

export default Header