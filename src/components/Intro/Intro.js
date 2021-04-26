import './Intro.scss'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import discofy_logo_small from '../../assets/discofy_logo_small.svg'



const spotifyIcon = <FontAwesomeIcon icon={faSpotify} className='spotifyIcon' />

const Intro = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL

  const handleLogin = () => {
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true&scope=user-library-read+user-follow-read+user-top-read+playlist-modify-private+playlist-modify-public`
  }

  return <div className='intro-container'>
            <img src={discofy_logo_small} alt='discofy-logo' className='logo_small' />
         <div>
           <h1 className='Title'>Put your headphones or speakers on.</h1>
              <p className='untertitile'>This website plays (lots of) music.</p>
         </div>
           <div className='card'>
             <div className='card-image'>
               <p className='icon-1'><i class="fas fa-hand-point-up"></i></p>
               <p className='p-style'>Click to dag deeper</p>
              
             </div>
             <div className='right'><i class="fas fa-angle-right"></i></div>
             <div className='card-image'>
               <p className='icon-2'><i class="fas fa-mouse-pointer"></i></p>
               <p className='p-style'>Hover to listen a music</p>
             </div>
             
             <div className='right'><i class="fas fa-angle-right"></i></div>
             <div className='card-image'>
               <p className='icon-3'><i class="fab fa-creative-commons-sampling-plus"></i></p>
               <p className='p-style'>Save to build your collection</p>
            </div>

           </div>
           <button className='intro-btn' variant='info' type='submit' onClick={handleLogin}>
             <div className='intro-firstlink'> {spotifyIcon} Login with Spotify</div>
             <div className='intro-secondlink'> {spotifyIcon} Login with Spotify</div>
           </button>
         </div>
}

export default Intro