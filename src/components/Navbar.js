import './Navbar.scss'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'

const Navbar = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
  // redirect muss noch geändert werden zur richtigen Adresse später
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL
  const handleLogin = () => {
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true&scope=user-library-read+user-follow-read+user-top-read`
  }
  const [navLinkOpen, navLinkToggle] = useState(false)
  const handleNavLinksToggle = () => {
    navLinkToggle(!navLinkOpen)
  }
  const handleLinksToggle = () => {
    if (navLinkOpen) {
    navLinkToggle(!navLinkOpen)}
  }
  const renderClasses = () => {
    let classes = 'navlinks'
    if (navLinkOpen) {
      classes += ' active'
    }
    return classes
  }
  return (
    <nav>
      <ul className={renderClasses()}>
      <div onClick={handleNavLinksToggle} className='hamburger-toggle'>
        <i className='fas fa-times'></i></div>
        <li className='link'>
          <Link to='/' onClick={handleLinksToggle}> Home
          </Link>
        </li>
        <li className='link'>
          <Link to='/' onClick={handleLinksToggle}> Contact
          </Link>
        </li>
        <li className='link, spacing-deco'>|
          </li>
        <li className='link'>
          <button onClick={handleLogin}>
            <Link to='/'> Login
            </Link>
          </button>
        </li>
      </ul>
      <div onClick={handleNavLinksToggle} className='hamburger-toggle'>
        <i className='fas fa-bars fa-lg'></i>
      </div>
    </nav>
  )}
export default Navbar