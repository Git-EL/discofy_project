import React from 'react'
import './GenreListe.scss'

const GenreListe = props => {

  return (
    <div className='col-sm-10 genre-container'>
      <div key={0} className="genre-box">
        {props.genrelist.map((item, idx) => 
        <div key={idx + 1} value={item.id}>
          <div className="genre-name">{item.name}</div>
          <img src={item.icons[0].url} alt="test" className="genre-image"/>
           
            </div>)}
      </div>
    </div>
  )
}

export default GenreListe
