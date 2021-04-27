import './DiscoverListe.scss'
import React from 'react'


// Zur Erinnerung: Get a User's Top Artists and Tracks
// Get the current user’s top artists or tracks based on calculated affinity.
// API: https://api.spotify.com/v1/me/top/artists

const NewReleasesListe = props => {

const clicked = e => {
     props.clicked(e.target.value);
 }    

  return (
    <div className='col-sm-10 discover-container'>
      <h4>Discover New Music</h4>
      <p className="info-message">Following artists have new releases. Get to know them and discover their music.</p>
      <div key={0} className="discover-box">
        {props.discoverlist.map((item, idx)  => 
                <div key={idx + 1}>
                <div className="discover-name">
                  {/* <p className="albumtitle">{item.name}</p> */}
                  <p className="artistname">{item.artists[0].name.length > 28 ? item.artists[0].name.substring(0, 28) + "..." : item.artists[0].name}</p>
                </div>
               
                <input type="radio" onChange={clicked} id={item.id} value={item.artists[0].name} className="discover-checkbox" name="choice"></input>
                <div className="box"><i className="far fa-heart"></i></div>
          
          <img src={item.images[0].url} alt="discover" className="discover-image" id={item.id} />
           

                  </div>)}
      </div>
    </div>
  )
}

export default NewReleasesListe
