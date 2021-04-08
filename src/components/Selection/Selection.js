import './Selection.scss'
import React, { useState } from 'react'
import GenreListe from './GenreListe'
import ArtistsListe from './ArtistsListe'
// import ArtistsTrackListe from './ArtistsTrackListe'
import UserGenreListe from './UserGenreListe'
import axios from 'axios'
// import getParamValues from '../../utils/function'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {Link} from 'react-router-dom'

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
  const [savedArtists, setSavedartists] = useState({
    listOfSavedartistsFromAPI: []
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
      setToken(tokenResponse.data.access_token)
      console.log(token)

      // Das hier muss noch User Music Genre werden
      axios('https://api.spotify.com/v1/browse/categories/?locale=en_US', {
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
    axios.all([
      axios.get('https://api.spotify.com/v1/me/following?type=artist', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
      }),
      axios.get('https://api.spotify.com/v1/me/top/artists', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
      })
    ]).then(axios.spread((artistsResponse, savedartistsResponse) => {
      setArtists({
      listOfArtistsFromAPI: artistsResponse.data.artists.items})
      setSavedartists({
      listOfSavedartistsFromAPI: savedartistsResponse.data.items})
    }))
  }

  const artistsboxClicked = (val) => {
    const currentArtists = [...artists.listOfArtistsFromAPI, ...savedArtists.listOfSavedartistsFromAPI]
    console.log(currentArtists)
    const artistsInfo = currentArtists.filter((t) => t.id === val)
    console.log(artistsInfo)

    setArtistDetail(artistsInfo[0].id)
    console.log('val: ' + val)

    axios(`https://api.spotify.com/v1/recommendations?seed_artists=${val}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
    }).then((artiststracksResponse) => {
      setArtiststracks({
      listOfArtiststracksFromAPI: artiststracksResponse.data.tracks})
      console.log(artiststracksResponse)
      console.log(artistsTracks)
    })
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
      <h3>
        Take your pick
      </h3>
      <Tabs>
        <TabList className='tab-title'>
          <Tab onClick={genrebuttonClicked}>
            Genre
          </Tab>
          <Tab onClick={artistsbuttonClicked}>
            Artists
          </Tab>
          <Tab onClick={usergenrebuttonClicked}>
            User Track Genre (TOP)
          </Tab>
        </TabList>
        <TabPanel>
          <div className='tab-contentbox'>
            <GenreListe title='Genre' genrelist={genres.listOfGenresFromAPI} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className='tab-contentbox'>
            <ArtistsListe
              title='Artists'
              artistslist={artists.listOfArtistsFromAPI}
              savedartistslist={savedArtists.listOfSavedartistsFromAPI}
              clicked={artistsboxClicked} />
            <div>
              id:
              {artistDetail}
              {/* <ArtistsTrackListe title='ArtistsTracks' artiststracklist={artiststracks.listOfArtiststracksFromAPI}/> */}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='tab-contentbox'>
            <UserGenreListe title='UserGenre' usergenrelist={usergenre.listOfUsergenreFromAPI} />
          </div>
        </TabPanel>
      </Tabs>
      <div className='choices'>
        <h1 className='happychoices'>Happy with your choices?</h1>
        <div className='boxresult'>
          <button className='filter-btn'>
            <Link to='/filter' className='filter-link'>
            Filter Songs
            </Link>
          </button>
        </div>
      </div>
      </ div>

  )
}

export default Selection