import './Intro.scss'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import discofy_logo_small from '../../assets/discofy_logo_small.svg'
import select_cat from '../../assets/select_cat.svg'
import create_playlist from '../../assets/create_playlist.svg'
import hover_icon from '../../assets/hover_icon.svg'


const Intro = () => {

  const spotifyIcon = <FontAwesomeIcon icon={faSpotify} className='spotifyIcon' />

  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL

  const handleLogin = () => {
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true&scope=user-library-read+user-follow-read+user-top-read+playlist-modify-private+playlist-modify-public`
  }

  return <div className='intro-container'>
            <img src={discofy_logo_small} alt='discofy-logo' className='logo_small' />
         <div>
           <h1 className='Title'>Put your headphones or speakers on</h1>
              <p className='untertitile'>This website plays lots of music</p>
         </div>
           <div className='card'>
             <div className='card-box'>
               <img src={select_cat} alt='select-category' className='select-category' />
               <p className='p-style'>1. Choose your category</p>
              
             </div>
             <div className='right'><i className="fas fa-angle-right"></i></div>
             <div className='card-box'>
             <img src={hover_icon} alt='hover' className='hover-icon' />
               <p className='p-style'>2. Hover to get song previews and pick your songs</p>
             </div>
             
             <div className='right'><i className="fas fa-angle-right"></i></div>
             <div className='card-box'>
             <img src={create_playlist} alt='create-playlist' className='create-playlist' />
               <p className='p-style'>3. Create your playlist <br></br>and save it to Spotify</p>
            </div>

           </div>
           <button className='intro-btn' variant='info' type='submit' onClick={handleLogin}>
             <div className='intro-firstlink'> {spotifyIcon} Login with Spotify</div>
             <div className='intro-secondlink'> {spotifyIcon} Login with Spotify</div>
           </button>
         </div>
}

export default Intro