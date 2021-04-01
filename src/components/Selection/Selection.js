import './Selection.scss'
// import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'
import GenreListe from './GenreListe'
import axios from 'axios'
import getParamValues from '../../utils/function'

const Selection = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_clientSecret = process.env.REACT_APP_CLIENT_SECRET
  // const spotify_authorize = process.env.REACT_APP_AUTHORIZE_URL
  // const spotify_redirect = process.env.REACT_APP_REDIRECT_URL
  const  getAccessToken = localStorage.getItem('params');
  const spotify_accessToken = JSON.parse(getAccessToken);
  console.log(spotify_accessToken.access_token)

  const [token, setToken] = useState('')
  const [genres, setGenres] = useState({
    listOfGenresFromAPI: []
  })

  const genrebuttonClicked = (e) => {
    e.preventDefault()

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(spotify_clientId + ':' + spotify_clientSecret)
      }, 
      data: 'grant_type=client_credentials',
      method: 'POST'
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token) 
      
      // Das hier muss noch User Music Genre werden
      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + tokenResponse.data.access_token }
      }).then((genreResponse) => {
        setGenres({
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })
    })
  } 

  return (
    <div className='container'>
      <button onClick={genrebuttonClicked}>
        Genre
      </button>
      <GenreListe title='Genre' genrelist={genres.listOfGenresFromAPI} />
    </div>
  )
}

export default Selection
