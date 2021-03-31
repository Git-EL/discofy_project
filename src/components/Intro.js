import './Intro.scss'
import React from 'react'

const Intro = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
  // redirect muss noch geändert werden zur richtigen Adresse später
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL

  const handleLogin = () => {
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true`
  }

  return <div className='testdiv'>
           <h2>Test-Text</h2>
           <button variant='info' type='submit' onClick={handleLogin}>
             Login with Spotify
           </button>
         </div>
}

export default Intro
