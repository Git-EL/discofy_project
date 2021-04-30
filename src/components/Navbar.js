import './Navbar.scss'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'

const Navbar = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL
  const [navLinkOpen, navLinkToggle] = useState(false)
  const [logStatus, setLogStatus] = useState({loggedInStatus: false})


  const handleLogin = () => {
    setLogStatus({loggedInStatus: false})
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true&scope=user-library-read+user-follow-read+user-top-read+playlist-modify-private+playlist-modify-public`
  }

  const logOut = () => {
    setLogStatus({loggedInStatus: true})
    localStorage.clear();
    if (localStorage.getItem(handleLogin)){
      window.location.reload();
    }
    return 'you were logout';
  }

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
          <Link to='/contact' onClick={handleLinksToggle}> Contact
          </Link>
        </li>
        <li className='link, spacing-deco'>|
          </li>
        <li className='link'>
        {logStatus.loggedInStatus ? (
        <button onClick={handleLogin}>
        <Link to='/'> Login
        </Link>
      </button>)
        : (<button onClick={logOut}>
        <Link to='/'> Logout
        </Link>
      </button>)
        }
        </li>
      </ul>
      <div onClick={handleNavLinksToggle} className='hamburger-toggle'>
        <i className='fas fa-bars fa-lg' ></i>
      </div>
    </nav>
  )}
export default Navbar