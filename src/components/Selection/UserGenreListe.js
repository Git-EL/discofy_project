import './UserGenreListe.scss'
import React from 'react'


// Zur Erinnerung: Get a User's Top Artists and Tracks
// Get the current user’s top artists or tracks based on calculated affinity.
// API: https://api.spotify.com/v1/me/top/artists

const UserGenreListe = props => {

  const clicked = e => {
    props.clicked(e.target.id);
}    

return (
  <div className='col-sm-10 usergenre-container'>
    <div key={0} className="usergenre-box">

      {props.usergenrelist.map((item, idx)  => 
              <div key={idx + 1}>
              <div className="usergenre-name" id={item.value}><p>{item.name}</p></div>
             
              <input type="radio" onChange={clicked} id={item.value} className="usergenre-checkbox" name="choice"></input>
              <div className="box"></div>
               
                </div>)}
      </div>
    </div>
  )
}

export default UserGenreListe
