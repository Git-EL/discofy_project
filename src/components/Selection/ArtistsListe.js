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
    <div className='col-sm-10'>
      <div key={0} className="ArtistsBox">
        {props.artistslist.map((item, idx) => 
        <button key={idx + 1} onClick={clicked} id={item.id} className="artists-button">
          {item.name}
            </button>
          )
          }
      </div>
    </div>
  )
}

export default ArtistsListe
