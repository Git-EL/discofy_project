import './UserGenreListe.scss'
import React from 'react'


// Zur Erinnerung: Get a User's Top Artists and Tracks
// Get the current user’s top artists or tracks based on calculated affinity.
// API: https://api.spotify.com/v1/me/top/artists


const UserGenreListe = props => {

  return (
    <div className='col-sm-10 usergenre-container'>
      <div key={0} className="UserGenreBox">
        {props.usergenrelist.map((item, idx) => 
        <ul key={idx + 1} value={item.id}>
          <li>{item.genres[1]}</li>
          <li>{item.genres[2]}</li>
          <img src={item.images[0].url} alt="test" width="100" height="100"/>
            </ul>
        
          )
          }
      </div>
    </div>
  )
}

export default UserGenreListe
