import './UserGenreListe.scss'
import React from 'react'


// Zur Erinnerung: Get a User's Top Artists and Tracks
// Get the current user’s top artists or tracks based on calculated affinity.
// API: https://api.spotify.com/v1/me/top/artists




const UserGenreListe = props => {

  return (
    <div className='col-sm-10 usergenre-container'>
      <div key={0} className="UserGenreBox">
        {props.usergenrelist.map((item, idx)  => 
        item.genres[1] !== undefined ? 
        <ul key={idx + 1} value={item.id}>
         
          <li>{item.genres[1]}</li>
          </ul> : null
          )
          } {props.usergenrelist.map((item, idx) => 
            item.genres[2] !== undefined ? 
            <ul key={idx + 1} value={item.id}>
              <li>{item.genres[2]}</li>
              </ul> : null
              )
              }
      </div>
    </div>
  )
}

export default UserGenreListe
