import React from 'react'

const GenreListe = props => {

  return (
    <div className='col-sm-10'>
      <div key={0}>
        {props.genrelist.map((item, idx) => 
        <div key={idx + 1} value={item.id}>
          <div>{item.name}</div>
            </div>)}
      </div>
    </div>
  )
}

export default GenreListe
