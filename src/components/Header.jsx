import React from 'react'
import sterkLogo from '/src/assets/logoBlack.png'
import { Link } from 'react-router-dom'

function Header(props) {
    return (
        <header className='header'>
            <Link to='/'>
                <div className='header--logo-wrapper'>
                    <img className='header--logo-img' src={sterkLogo} alt="Sterk logo" />
                    <span className='header--logo-txt'>Sterk</span>
                </div>
            </Link>
            <div className='header--btns'>
                <Link to='/users'>
                    <button className='btn btn-tertiary btn-small'><i className="fa-solid fa-magnifying-glass"></i></button>
                </Link>
                <button className='btn btn-tertiary btn-small' onClick={props.signOut}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
        </header>
    )
}

export default Header