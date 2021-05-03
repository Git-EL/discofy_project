import './DiscoverListe.scss'
import React from 'react'
import aurora from '../../assets/aurora.jpeg'

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
                <div key={idx + 1} className="discover-innerbox">
                <div className="discover-name">
                  {/* <p className="albumtitle">{item.name}</p> */}
                  <p className="artistname">{item.artists[0].name.length > 28 ? item.artists[0].name.substring(0, 28) + "..." : item.artists[0].name}</p>
                </div>
               
                <input type="radio" onChange={clicked} id={item.id} value={item.artists[0].name} className="discover-checkbox" name="choice"></input>
                <div className="box"><i className="far fa-heart"></i></div>
          
          <img src={item.images.length === 0 ? aurora : item.images[0].url }  alt="discover" className="discover-image" id={item.id} />
         </div>)}
      </div>
    </div>
  )
}

export default NewReleasesListe
