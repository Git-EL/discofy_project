import './ArtistsListe.scss'

// Zur Erinnerung: Get a User's Top Artists and Tracks
// Get the current user’s top artists or tracks based on calculated affinity.
// API: https://api.spotify.com/v1/me/top/artists


const ArtistsListe = props => {
  
  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
}    

  return (
    <div className='col-sm-10 artist-container'>
      <h4>Top Artists vom Nutzer</h4>
      <p className="info-message">Get tracks from similar artists based on your top artists</p>
      <div key={0} className="ArtistsBox">
      
        {props.savedartistslist.length > 0 ? props.savedartistslist.map((item, idx) => 
        <div key={idx + 1}>
          <div onClick={clicked} id={item.id} className="artist-name">{item.name}</div>
          <img src={item.images[0].url} alt="test" className="artist-image"  onClick={clicked} id={item.id} />
            </div>
          ) : <p className="missing-message">Du hast leider keine Top-Artists</p>
          }
      </div>
      <h4>Your followed artists</h4>
      <p className="info-message">Get tracks from similar artists based on your followed artists</p>
      <div key={1} className="ArtistsBox">
      {props.artistslist.length > 0 ? props.artistslist.map((item, idx) => 
        <div key={idx + 1}>
          <div onClick={clicked} id={item.id} className="artist-name">{item.name}</div>
          <img src={item.images[0].url} alt="test" className="artist-image"  onClick={clicked} id={item.id} />
           
            </div>
          ) : <p className="missing-message">Du folgst leider keinen Artists</p>
          }
      </div>
    </div>
  )
}

export default ArtistsListe
