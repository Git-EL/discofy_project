import './SubGenreListe.scss'
import React from 'react'


// Zur Erinnerung: Get a User's Top Artists and Tracks
// Get the current user’s top artists or tracks based on calculated affinity.
// API: https://api.spotify.com/v1/me/top/artists

const SubGenreListe = props => {

  const clicked = e => {
    props.clicked(e.target.id);
}    

  return (
    <div className='col-sm-10 subgenre-container'>
 <h4>Genre based on your Followed Artists</h4>
      <p className="info-message">Get a variety of song recommendations based on your chosen sub-genre.</p>
      <div key={0} className="subgenre-box">
        {props.usergenrelist.length > 0 ? props.usergenrelist.map((item, idx)  => 
                <div key={idx + 1} div="tree">
                <div className="subgenre-name" id={item.value}><p>{item.name}</p></div>
               
                <input type="radio" onChange={clicked} id={item.value} className="subgenre-checkbox" name="choice"></input>
                <div className="box"></div>
                 
                  </div>): <p className="missing-message"><i className="far fa-times-circle"></i> Unfortunately you are not following any artist.
                  Please <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">follow some artists on Spotify</a> and come back!</p>
          }
      </div>
      </div>
  )
}

export default SubGenreListe
