import React from 'react'
import './GenreListe.scss'

const GenreListe = props => {

  const clicked = e => {
    // e.preventDefault();
    props.clicked(e.target.id);
}    


  return (
    <div className='col-sm-10 genre-container'>
      <h4>Browse All</h4>
      <p className="info-message">Select a category below and get a bunch of track recommendations based on your chosen genre</p>
      <div key={0} className="genre-box">
        {props.genrelist.map((item, idx) => 
        <div key={idx + 1}>
          <div className="genre-name">{item.name}</div>
         
          <input type="radio" onChange={clicked} id={item.id} className="genre-checkbox" name="choice"></input>
          <div className="box"><i className="far fa-heart"></i></div>
         
          <img src={item.icons[0].url} alt="genre" className="genre-image" id={item.id} />
           
            </div>)}
      </div>
    </div>
  )
}

export default GenreListe
