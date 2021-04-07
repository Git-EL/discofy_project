import './Selection.scss'
import React, { useState } from 'react'
import GenreListe from './GenreListe'
import ArtistsListe from './ArtistsListe'
// import ArtistsTrackListe from './ArtistsTrackListe'
import UserGenreListe from './UserGenreListe'
import axios from 'axios'
// import getParamValues from '../../utils/function'

const Selection = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_clientSecret = process.env.REACT_APP_CLIENT_SECRET
  // const spotify_authorize = process.env.REACT_APP_AUTHORIZE_URL
  // const spotify_redirect = process.env.REACT_APP_REDIRECT_URL

  const getAccessToken = localStorage.getItem('params')
  const spotify_accessToken = JSON.parse(getAccessToken)

  const [token, setToken] = useState('')
  const [genres, setGenres] = useState({
    listOfGenresFromAPI: []
  })
  const [artists, setArtists] = useState({
    listOfArtistsFromAPI: []
  })
  const [artistsTracks, setArtiststracks] = useState({
    listOfArtiststracksFromAPI: []
  })
  const [usergenre, setUsergenre] = useState({
    listOfUsergenreFromAPI: []
  })
  const [artistDetail, setArtistDetail] = useState('')

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
      setToken(tokenResponse.data.access_token);
      console.log(token)

      // Das hier muss noch User Music Genre werden
      axios('https://api.spotify.com/v1/browse/categories', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + tokenResponse.data.access_token }
      }).then((genreResponse) => {
        setGenres({
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })
    })
  }

  const artistsbuttonClicked = (e) => {
    e.preventDefault()

    axios('https://api.spotify.com/v1/me/top/artists', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
    }).then((artistsResponse) => {
      setArtists({
      listOfArtistsFromAPI: artistsResponse.data.items})
    })
  }

  const artistsboxClicked = (val) => {
    const currentArtists = [...artists.listOfArtistsFromAPI];
    console.log(currentArtists);
    const artistsInfo = currentArtists.filter((t) => t.id === val);
    console.log(artistsInfo);

    setArtistDetail(artistsInfo[0].id);
    console.log('val: ' + val);

      axios(`https://api.spotify.com/v1/recommendations?seed_artists=${val}`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
      }).then((artiststracksResponse) => {
        setArtiststracks({
        listOfArtiststracksFromAPI: artiststracksResponse.data.tracks});
        console.log(artiststracksResponse);
        console.log(artistsTracks);
      } )
     
  }

  const usergenrebuttonClicked = (e) => {
    e.preventDefault()

    // Das hier zeigt die Genre basierend auf User Top Tracks an
    axios('https://api.spotify.com/v1/me/top/artists', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
    }).then((usergenreResponse) => {
      setUsergenre({
        listOfUsergenreFromAPI: usergenreResponse.data.items
      })
    })
  }

  return (
    <div className='container'>
      <button onClick={genrebuttonClicked} className='main-button'>
        Genre
      </button>
      <GenreListe title='Genre' genrelist={genres.listOfGenresFromAPI} />

      <button onClick={artistsbuttonClicked} className='main-button'>
        Artists
      </button>
      <ArtistsListe title='Artists' artistslist={artists.listOfArtistsFromAPI} clicked={artistsboxClicked} />
      <div>
        id:
        {artistDetail}
        {/* <ArtistsTrackListe title='ArtistsTracks' artiststracklist={artiststracks.listOfArtiststracksFromAPI}/> */}
      </div>

      <button onClick={usergenrebuttonClicked} className='main-button'>
        User Track Genre (TOP)
      </button>
      <UserGenreListe title='UserGenre' usergenrelist={usergenre.listOfUsergenreFromAPI} />
    </div>
  )
}

export default Selection
