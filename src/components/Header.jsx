import React from 'react'
import sterkLogo from '/src/assets/logoBlack.png'

function Header(props) {
    return (
        <header className='header'>
            <a href='/'>
                <div className='header--logo-wrapper'>
                    <img className='header--logo-img' src={sterkLogo} alt="Sterk logo" />
                    <span className='header--logo-txt'>Sterk</span>
                </div>
            </a>
            <div className='header--btns'>
                <a href='/findfriends'>
                    <button className='btn btn-tertiary btn-small'><i className="fa-solid fa-magnifying-glass"></i></button>
                </a>
                <button className='btn btn-tertiary btn-small' onClick={props.signOut}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
        </header>
    )
}

export default Header