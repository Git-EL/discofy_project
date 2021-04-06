import React from 'react'

const ArtistsTrackListe = props => {

  return (
    <div className='col-sm-10'>
      <div key={0}>
        {props.artiststracklist.map((item, idx) => 
        <div key={idx + 1} value={item.id}>
          <div>{item}</div>
            </div>)}
      </div>
    </div>
  )
}

export default ArtistsTrackListe
