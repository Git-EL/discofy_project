import './ArtistsListe.scss'

// Zur Erinnerung: Get a User's Top Artists and Tracks
// Get the current user’s top artists or tracks based on calculated affinity.
// API: https://api.spotify.com/v1/me/top/artists


const ArtistsListe = props => {
  
  const clicked = e => {
    // e.preventDefault();
    props.clicked(e.target.id);
}    

  return (
    <div className='col-sm-10 artist-container'>
      <h4>Your Followed Artists</h4>
      <p className="info-message">Get tracks from similar artists based on your followed artists</p>
      <div className="artist-outerbox">
      <div key={1} className="artist-box">
      {props.artistslist.length > 0 ? props.artistslist.map((item, idx) => 
        <div key={idx + 1} className="artist-innerbox">
          <div onClick={clicked} id={item.id} className="artist-name">{item.name.length > 28 ? item.name.substring(0, 28) + "..." : item.name}</div>

          <input type="radio" onChange={clicked} id={item.id} className="artist-checkbox" name="choice"></input>
          <div className="box"><i className="far fa-heart"></i></div>

          <img src={item.images[0].url} alt="artist" className="artist-image"  onClick={clicked} id={item.id} />
           
            </div>
          ) : <p className="missing-message"><i className="far fa-times-circle"></i> Unfortunately you are not following any artist.
          Please <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">follow some artists on Spotify</a> and come back!</p>
          }
      </div>
      <h4>Your Top Listened Artists</h4>
      <p className="info-message">Get tracks from similar artists based on your top listened artists
      </p>
      <div key={0} className="artist-box">
      
        {props.savedartistslist.length > 0 ? props.savedartistslist.map((item, idx) => 
        <div key={idx + 1} className="artist-innerbox">
          <div onClick={clicked} id={item.id} className="artist-name">{item.name.length > 28 ? item.name.substring(0, 28) + "..." : item.name}</div>

          <input type="radio" onChange={clicked} id={item.id} className="artist-checkbox" name="choice"></input>
          <div className="box"><i className="far fa-heart"></i></div>
          
          <img src={item.images[0].url} alt="artist" className="artist-image"  onClick={clicked} id={item.id} />
            </div>
          ) : <p className="missing-message"><i className="far fa-times-circle"></i> Unfortunately you don't have any registered top artists</p>
          }
      </div>
      </div>
    </div>
  )
}

export default ArtistsListe
