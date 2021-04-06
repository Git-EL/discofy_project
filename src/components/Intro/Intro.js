import './Intro.scss'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

const spotifyIcon = <FontAwesomeIcon icon={faSpotify} className='spotifyIcon' />

const Intro = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL

  const handleLogin = () => {
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true&scope=user-top-read,user-library-read`
  }

  return <div className='testdiv'>
           <h2>Test-Text</h2>
           <button variant='info' type='submit' onClick={handleLogin}>
             {spotifyIcon} Login with Spotify
           </button>
         </div>
}

export default Intro
