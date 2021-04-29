import './Selection.scss'
import React, { useState , useEffect } from 'react'
import GenreListe from './GenreListe'
import ArtistsListe from './ArtistsListe'
import SubGenreListe from './SubGenreListe'
import DiscoverListe from './DiscoverListe'
import Filter from '../Filter/Filter'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import artist_icon from '../../assets/artist_icon.svg'
import { Redirect } from 'react-router-dom';
import discofy_logo_small from '../../assets/discofy_logo_small.svg'

const Selection = (props) => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_clientSecret = process.env.REACT_APP_CLIENT_SECRET
  const getAccessToken = localStorage.getItem('params')
  const spotify_accessToken = JSON.parse(getAccessToken)
  const { isValidSession, history } = props;

  const [token, setToken] = useState('')
  const [genres, setGenres] = useState({
    listOfGenresFromAPI: []
  })
  const [artists, setArtists] = useState({
    listOfArtistsFromAPI: []
  })
  const [discover, setDiscover] = useState({
    listOfDiscoverFromAPI: []
  })
  const [savedArtists, setSavedartists] = useState({
    listOfSavedartistsFromAPI: []
  })
  const [artistsTracks, setArtiststracks] = useState({
    listOfArtiststracksFromAPI: []
  })
  const [discoverTracks, setDiscoverTracks] = useState({
    listOfDiscoverTracksFromAPI: []
  })
  const [genreTracks,  setGenreTracks] = useState({
    listOfGenretracksFromAPI: []
  })
  const [subGenretracks,  setSubGenretracks] = useState({
    listOfSubGenretracksFromAPI: []
  })
  const [subGenre, setSubGenre] = useState({
    listOfSubGenreFromAPI: []
  })
  const [artistId, setArtistId] = useState('')
  const [genreId, setGenreId] = useState('')
  const [subGenreId, setSubGenreId] = useState('')
  const [discoverId, setDiscoverId] = useState('')
  const [artistName, setArtistName] = useState('')
  const [filterbtnStatus, setFilterbtnStatus] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)

  const [discoverPicture, setDiscoverPicture] = useState('')
  

  useEffect(() => {
    if (isValidSession()) {
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
    })  } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  },[history, isValidSession, spotify_clientId, spotify_clientSecret]);

  const genrebuttonClicked = (e) => {
    if (isValidSession()) {
    e.preventDefault()

      axios('https://api.spotify.com/v1/browse/categories/?locale=en_US&limit=40', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token }
      }).then((genreResponse) => {
        setGenres({
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })} else {
        history.push({
          pathname: '/',
          state: {
            session_expired: true
          }
        });
      }
  }

  const genreboxClicked = async (val) => {
    const currentGenre = genres.listOfGenresFromAPI
    const genreId = currentGenre.filter((t) => t.id === val)
   
    setDiscoverPicture(genreId[0].icons[0].url)


    setGenreId(val)
    setSubGenreId('')
    setArtistId('')
    setDiscoverId('')
    setButtonActive(true)
        
    try{
      let playlistIDResponse = await axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/browse/categories/${val}/playlists`,
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token },
    })
    let playlistID = await playlistIDResponse.data.playlists.items[Math.floor(Math.random() * 9) + 1].id
      
    let genreTracksResponse = await axios ({ 
      method: 'GET',
      url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token },
      });
      setGenreTracks(
        {listOfGenretracksFromAPI: genreTracksResponse.data.items.map(a => a.track)})
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

    
    setDiscoverPicture(artistsInfo[0].images[0].url)
    setArtistId(artistsInfo[0].id)
    setArtistName(artistsInfo[0].name)
    setGenreId('')
    setSubGenreId('')
    setDiscoverId('')
    setButtonActive(true)
    console.log(artistName)
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

  const subGenrebuttonClicked = async (e) => {
    e.preventDefault()

    try{
    let followedArtistResponse = await axios({ 
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/following?type=artist',
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
    })
    let followedArtist = {
      listOfFollowedArtistFromAPI: followedArtistResponse.data.artists.items }
    
    const genres = followedArtist.listOfFollowedArtistFromAPI.map(obj => {return obj.genres}).flat();
    const genreObj = genres.map(obj => {return {value: obj, name: obj}});
    const uniqueGenres = genreObj.filter(function(el) {
       if (!this[el.value]) { this[el.value] = true;
        return true;
      }
       return false;
    }, Object.create(null));

    setSubGenre({
        listOfSubGenreFromAPI: uniqueGenres 
    })
     console.log(subGenre)
    } catch(error){
      console.log(error)
      }   
  }
  
  const subGenreboxClicked = (val) => {

    setDiscoverPicture("https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753__340.jpg")

    setSubGenreId(val)
    setGenreId('')
    setArtistId('')
    setDiscoverId('')
    setButtonActive(true)
    console.log('val: ' + val)

     axios(`https://api.spotify.com/v1/search?q=genre:%22${val}%22&type=track&limit=50`, {
       method: 'GET',
       headers: { Authorization: 'Bearer ' + token}
     }).then((subGenretracksResponse) => {
      setSubGenretracks({
      listOfSubGenretracksFromAPI: subGenretracksResponse.data.tracks.items})
      console.log(subGenretracksResponse)
      console.log(subGenretracks)
    })
  }

  const discoverbuttonClicked = (e) => {
    e.preventDefault()
    
       axios('https://api.spotify.com/v1/browse/new-releases?limit=48', {
         method: 'GET',
         headers: { Authorization: 'Bearer ' + token }
       })
     .then((discoverResponse) => {
       setDiscover({
       listOfDiscoverFromAPI: discoverResponse.data.albums.items})
    })
    console.log(discover)
  }

  const discoverboxClicked = (val) => {
    const currentDiscoverArtists = discover.listOfDiscoverFromAPI
    console.log(currentDiscoverArtists)
    const discoverArtistsId = currentDiscoverArtists.filter((t) => t.artists[0].name === val)
    console.log(discoverArtistsId)

    setDiscoverPicture(discoverArtistsId[0].images[0].url)
    console.log(discoverPicture)
    setDiscoverId(val)
    setGenreId('')
    setSubGenreId('')
    setArtistId('')
    setButtonActive(true)
    console.log('val: ' + val)

      axios(`https://api.spotify.com/v1/search?q=artist:%22${val}%22&type=track&limit=50`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token}
      }).then((discoverResponse) => {
       setDiscoverTracks({
        listOfDiscoverTracksFromAPI: discoverResponse.data.tracks.items})
       console.log(discoverResponse)
       console.log(discoverTracks)
     })
  }

    const filterbtnClicked = () => {
      if (!filterbtnStatus){setFilterbtnStatus(true)}
    }
 

    
    return (
    isValidSession() ? (
    (genreId && filterbtnStatus) || (subGenreId && filterbtnStatus) || (artistId && filterbtnStatus) || (discoverId && filterbtnStatus) ? 
    ( <div className='filter-container'>
        <Filter 
        title='ArtistsTracks'
        name={genreId || subGenreId || discoverId || artistName}
        artiststracklist={
            genreId ? genreTracks.listOfGenretracksFromAPI
          : artistId ? artistsTracks.listOfArtiststracksFromAPI 
          : subGenreId ? subGenretracks.listOfSubGenretracksFromAPI
          : discoverId ? discoverTracks.listOfDiscoverTracksFromAPI
          : null}/>
      </div>
    )
    :
    ( 
    <div className='container'>
    <a href="/"><img src={discofy_logo_small} alt='discofy-logo' className='logo_small' /></a>
    <h3>Take your pick</h3>
     <div className='inner-container'>
        <Tabs>
          <TabList className='tab-title'>
            <Tab onClick={genrebuttonClicked}>
            <i className="fas fa-compact-disc"></i>
              Genre
            </Tab>
            <Tab onClick={subGenrebuttonClicked}>
            <i className="fas fa-drum"></i>
              Sub-Genre
            </Tab>
            <Tab onClick={artistsbuttonClicked}>
            <img src={artist_icon} alt='artists-icon' className='artists-icon' />
              Artists
            </Tab>
            <Tab onClick={discoverbuttonClicked}>
            <i className="fab fa-telegram-plane"></i>
              Discover
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
              <SubGenreListe 
              title='SubGenre' 
              usergenrelist={subGenre.listOfSubGenreFromAPI}
              clicked={subGenreboxClicked} />
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
             </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='tab-contentbox'>
              <DiscoverListe 
              title='Discover' 
              discoverlist={discover.listOfDiscoverFromAPI}
              clicked={discoverboxClicked} 
              />
            </div>
          </TabPanel>
        </Tabs>
        <div className='choices'>
        <div className='boxresult'>
        <div className='yourchoice'>Your pick is<p className='categorypick'>{genreId.trim().replaceAll("_", " ") || subGenreId || discoverId || artistName}</p> </div>   
        {discoverPicture ? <div className="preview-imagewrap"><img src={discoverPicture} alt="preview" className="preview-image" /></div>: null}
        <h1 className='happychoices'>Happy with your choice?</h1>                 
          <button className='filter-btn' disabled={!buttonActive} onClick={filterbtnClicked}>
            <div className='filter-firstlink'> Get your Songs
            </div>
            <div className='filter-secondlink'> Get your Songs
          </div>
            </button>
          </div>
        </div>
      </div>
      </div>)): (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )
   )
}

export default Selection
