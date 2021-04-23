import './Selection.scss'
import React, { useState , useEffect } from 'react'
import GenreListe from './GenreListe'
import ArtistsListe from './ArtistsListe'
import UserGenreListe from './UserGenreListe'
import Filter from '../Filter/Filter'
import axios from 'axios'
// import getParamValues from '../../utils/function'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import artist_icon from '../../assets/artist_icon.svg'

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
  const [genreTracks,  setGenreTracks] = useState({
    listOfGenretracksFromAPI: []
  })
  const [userGenretracks,  setUserGenretracks] = useState({
    listOfUserGenretracksFromAPI: []
  })
  const [usergenre, setUsergenre] = useState({
    listOfUsergenreFromAPI: []
  })
  const [artistId, setArtistId] = useState('')
  const [genreId, setGenreId] = useState('')
  const [userGenreId, setUserGenreId] = useState('')
  const [filterbtnStatus, setFilterbtnStatus] = useState(false)

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(spotify_clientId + ':' + spotify_clientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token)

      axios('https://api.spotify.com/v1/browse/categories/?locale=en_US&limit=40', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + tokenResponse.data.access_token }
      }).then((genreResponse) => {
        setGenres({
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })
    })
  },[spotify_clientId, spotify_clientSecret]);

  const genrebuttonClicked = (e) => {
    e.preventDefault()

      axios('https://api.spotify.com/v1/browse/categories/?locale=en_US&limit=40', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token }
      }).then((genreResponse) => {
        setGenres({
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })
  }

  const genreboxClicked = async (val) => {
    const currentGenres = genres.listOfGenresFromAPI
    console.log(currentGenres)
    const genreID = currentGenres.filter((t) => t.id === val)
    console.log(genreID)
    
    setGenreId(val)
    setUserGenreId('')
    setArtistId('')
    console.log('val: ' + val)
    
    
    try{
      let playlistIDResponse = await axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/browse/categories/${val}/playlists`,
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token },
    })
    let playlistID = await playlistIDResponse.data.playlists.items[Math.floor(Math.random() * 9) + 1].id
    console.log(playlistID)
    
    let genreTracksResponse = await axios ({ 
      method: 'GET',
      url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token },
      });
      setGenreTracks(
        {listOfGenretracksFromAPI: genreTracksResponse.data.items.map(a => a.track)})
        console.log(genreTracks.listOfGenretracksFromAPI)


     } catch(error){
      console.log(error)
    }   
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

    setArtistId(artistsInfo[0].id)
    setGenreId('')
    setUserGenreId('')
    console.log('val: ' + val)

    axios(`https://api.spotify.com/v1/recommendations?limit=70&seed_artists=${val}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
    }).then((artiststracksResponse) => {
      setArtiststracks({
      listOfArtiststracksFromAPI: artiststracksResponse.data.tracks})
      console.log(artiststracksResponse)
      console.log(artistsTracks)
    })
  }

  const usergenrebuttonClicked = async (e) => {
    e.preventDefault()
    try{
    // Das hier zeigt die Genre basierend auf followes artists Tracks an
    let followedArtistResponse = await axios({ 
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/following?type=artist',
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
    })
    let followedArtist = {
      listOfFollowedArtistFromAPI: followedArtistResponse.data.artists.items }
    
    const genres = followedArtist.listOfFollowedArtistFromAPI.map(obj => {return obj.genres}).flat();
    const genreObj = genres.map(obj => {return {value: obj.trim().replaceAll(" ", "%20"), name: obj}});
    const uniqueGenres = genreObj.filter(function(el) {
       if (!this[el.value]) { this[el.value] = true;
        return true;
      }
       return false;
    }, Object.create(null));

    setUsergenre({
        listOfUsergenreFromAPI: uniqueGenres 
    })
     console.log(usergenre)
    } catch(error){
      console.log(error)
      }   
  }
  
  const usergenreboxClicked = (val) => {
    const currentUsergenres = usergenre.listOfUsergenreFromAPI
    console.log(currentUsergenres)
    const genreID = currentUsergenres.filter((t) => t.value === val)
    console.log(genreID)

    setUserGenreId(val)
    setGenreId('')
    setArtistId('')
    console.log('val: ' + val)

     axios(`https://api.spotify.com/v1/search?q=genre:%22${val}%22&type=track&limit=50`, {
       method: 'GET',
       headers: { Authorization: 'Bearer ' + token}
     }).then((usergenretracksResponse) => {
      setUserGenretracks({
      listOfUserGenretracksFromAPI: usergenretracksResponse.data.tracks.items})
      console.log(usergenretracksResponse)
      console.log(userGenretracks)
    })
  }

    const filterbtnClicked = () => {
      if (!filterbtnStatus){setFilterbtnStatus(true)}
    }
 
  return (
    (genreId && filterbtnStatus) || (userGenreId && filterbtnStatus) || (artistId && filterbtnStatus) ? 
    ( <div className='filter-container'>
        <Filter 
        title='ArtistsTracks' 
        artiststracklist={
            genreId ? genreTracks.listOfGenretracksFromAPI
          : artistId ? artistsTracks.listOfArtiststracksFromAPI 
          : userGenreId ? userGenretracks.listOfUserGenretracksFromAPI
          : null}/>
      </div>
    )
    :
    ( 
    <div className='container'>
      <div className='inner-container'>
        <h3>Take your pick</h3>
        <Tabs>
          <TabList className='tab-title'>
            <Tab onClick={genrebuttonClicked}>
            <i className="fas fa-compact-disc"></i>
              Genre
            </Tab>
            <Tab onClick={artistsbuttonClicked}>
            <img src={artist_icon} alt='artists-icon' className='artists-icon' />
              Artists
            </Tab>
            <Tab onClick={usergenrebuttonClicked}>
              Sub-Genre (based on followed artists)
            </Tab>
          </TabList>
          <TabPanel>
          <div className='tab-contentbox'>
              <GenreListe 
              title='Genre' 
              genrelist={genres.listOfGenresFromAPI} 
              clicked={genreboxClicked} />
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
                {/* hier erscheint die artist id:
                {artistId} */}
             </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='tab-contentbox'>
              <UserGenreListe 
              title='UserGenre' 
              usergenrelist={usergenre.listOfUsergenreFromAPI}
              clicked={usergenreboxClicked} />
            </div>
          </TabPanel>
        </Tabs>
        </div>
        <div className='choices'>
        <div className='boxresult'>
          <h1 className='happychoices'>Happy with your choices?</h1>          
            <button className='filter-btn' onClick={filterbtnClicked}>
            <div className='filter-firstlink'> Filter Songs
            </div>
            <div className='filter-secondlink'> Filter Songs
       </div>
            </button>
          </div>
        </div>
      </div>)) 
}

export default Selection
