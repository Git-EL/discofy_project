import './ArtistsListe.scss'
import aurora from '../../assets/aurora.jpeg'

const ArtistsListe = props => {
  
  const clicked = e => {
    // e.preventDefault();
    props.clicked(e.target.id);
}    

  return (
    <div className='col-sm-10 artist-container'>
      <h4 className="followedartist-title">Your Followed Artists</h4>
      <p className="followedartist-message">Get tracks from similar artists based on your followed artists</p>
      <div className="artist-outerbox">
      <div key={1} className="artist-box">
      {props.artistslist.length > 0 ? props.artistslist.map((item, idx) => 
        <div key={idx + 1} className="artist-innerbox">
          <div onClick={clicked} id={item.id} className="artist-name">{item.name.length > 28 ? item.name.substring(0, 28) + "..." : item.name}</div>

          <input type="radio" onChange={clicked} id={item.id} className="artist-checkbox" name="choice"></input>
          <div className="box"><i className="far fa-heart"></i></div>

           <img src={item.images.length === 0 ? aurora : item.images[0].url} alt="artist" className="artist-image"  onClick={clicked} id={item.id} />
            </div>
          ) : <p className="missing-message"><i className="far fa-times-circle"></i> Unfortunately you are not following any artist.
          Please <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">follow some artists on Spotify</a> and come back!</p>
          }
      </div>
      <h4 className="topartist-title">Your Top Listened Artists</h4>
      <p className="topartist-message">Get tracks from similar artists based on your top listened artists
      </p>
      <div key={0} className="artist-box">
      
        {props.savedartistslist.length > 0 ? props.savedartistslist.map((item, idx) => 
        <div key={idx + 1} className="artist-innerbox">
          <div onClick={clicked} id={item.id} className="artist-name">{item.name.length > 28 ? item.name.substring(0, 28) + "..." : item.name}</div>

          <input type="radio" onChange={clicked} id={item.id} className="artist-checkbox" name="choice"></input>
          <div className="box"><i className="far fa-heart"></i></div>
          
          <img src={item.images.length === 0 ? aurora : item.images[0].url} alt="artist" className="artist-image"  onClick={clicked} id={item.id} />
            </div>
          ) : <p className="missing-message"><i className="far fa-times-circle"></i> Unfortunately you don't have any registered top artists</p>
          }
      </div>
      </div>
    </div>
  )
}

export default ArtistsListe
