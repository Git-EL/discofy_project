import './Selection.scss'
import React, { useState , useEffect } from 'react'
import GenreListe from './GenreListe'
import ArtistsListe from './ArtistsListe'
import SubGenreListe from './SubGenreListe'
import DiscoverListe from './DiscoverListe'
import Filter from '../Filter/Filter'
import axios from 'axios'
// import getParamValues from '../../utils/function'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import artist_icon from '../../assets/artist_icon.svg'

const Selection = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_clientSecret = process.env.REACT_APP_CLIENT_SECRET
  const getAccessToken = localStorage.getItem('params')
  const spotify_accessToken = JSON.parse(getAccessToken)

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
    const discoverArtistsId = currentDiscoverArtists.filter((t) => t.id === val)
    console.log(discoverArtistsId)

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
      <div className='inner-container'>
      <h3>Take your pick</h3>
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
                {/* hier erscheint die artist id:
                {artistId} */}
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

        </div>
        <div className='choices'>
        <div className='boxresult'>
         <h1 className='happychoices'>Happy with your choices?</h1>          
         <div className='yourchoice'>Your pick is<p className='categorypick'>{genreId || subGenreId || discoverId || artistName}</p> </div>   
         <button className='filter-btn' disabled={!buttonActive} onClick={filterbtnClicked}>
            <div className='filter-firstlink'> Get your Songs
            </div>
            <div className='filter-secondlink'> Get your Songs
          </div>
            </button>
          </div>
        </div>
      </div>)) 
}

export default Selection
