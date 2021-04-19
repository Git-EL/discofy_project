import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Filter.scss'

const Filter = (props) => {
  const getAccessToken = localStorage.getItem('params')
  const spotify_accessToken = JSON.parse(getAccessToken)

  const [selectedTracks, setSelectedTracks] = useState({ playlistTracks: [] })
  const [userID, setUserID] = useState('')
  const [playlistID, setPlaylistID] = useState('')
  const [playlist, setPlaylist] = useState('')
  const history = useHistory();

  const addTracks = event => {

   let addedTracks = [...selectedTracks.playlistTracks, event.target.value];
   if (selectedTracks.playlistTracks.includes(event.target.value)) {
     addedTracks = addedTracks.filter(track => track !== event.target.value);
   } 
   setSelectedTracks({
     playlistTracks: addedTracks
   }); 
 };console.log(selectedTracks)
 

 const deleteTrack = event => {

  setSelectedTracks(prevState => ({ playlistTracks: prevState.playlistTracks.filter(track =>  track !== event.target.value)     }))
  }
  console.log(selectedTracks) 


   useEffect(() => {
     axios('https://api.spotify.com/v1/me', {
       method: 'GET',
       headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
     }).then((userIDResponse) => {
       setUserID(userIDResponse.data.id)
       console.log(userIDResponse)
       console.log('userID: ' + userID)})
   },[spotify_accessToken.access_token, userID]);


  const createPlaylist = (e) => {
    e.preventDefault();

   axios(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token  },
      body: {
        'public': false
      },
      data: JSON.stringify({
        name: 'Discofy Playlist',
        description: 'Hello! I am your newly created Discofy Playlist'
      })
    }).then((playlistIDResponse) =>  {
      setPlaylistID(playlistIDResponse.data.id)
      console.log(playlistIDResponse)
      console.log('playlistID: ' + playlistID) 
     
     return axios(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token },
          data: JSON.stringify({ uris: selectedTracks.playlistTracks })})
   }).then((playlistResponse) => {
      setPlaylist(playlistResponse)
      console.log(playlistResponse)
      console.log('playlist: ' + playlist)})
  }

  // checked={false}

  return (
    <div className='col-sm-10'>
      <h3>Select your songs</h3>
      <form onSubmit={createPlaylist} className="filter-box">
      <div key={0} className="tracklist-box">  
      <div className="tracklist-insidebox">  
        {props.artiststracklist.map((item, idx) =>  
          {const audio = new Audio(item.preview_url);
            const playtrack = () => { audio.play(); audio.volume = 0.1; }
            const stoptrack = () => { audio.pause() }
            return (
              item.preview_url ?  <div key={idx + 1} value={item.id} className='filter-outerbox'>
                 <div className="filter-imagebox" onMouseOver={playtrack} onMouseLeave={stoptrack}><img src={item.album.images[0].url} alt="test" className="trackalbum-image" id={item.id} />
                    <div className="checkbox-container" >
                      <input type="checkbox" className="custom-input " id={item.id} value={item.uri} name={item.name} onChange={addTracks} onChangeCapture={stoptrack}/>
                      <span className="checkmark"></span>
             <div className="checkmark-box"><p>{item.artists[0].name}</p><p>{item.name}</p></div>
                   </div> 
                  </div>
                  </div> 
                : null      
             )
          })
        }
      </div></div>
      <div key={1} className="playlist-box">
      <h2>Discofy Playlist</h2>
        {props.artiststracklist.map((item, idx) => 
          <div key={idx + 1} value={item.id}>
            <div className="playlist-preview">{selectedTracks.playlistTracks.includes(item.uri) ? 
              <div className="track-info"><p>Artist: {item.artists[0].name}</p><p> Title: {item.name}</p><p>Album: {item.album.name}</p>
              <button onClick={deleteTrack} id={item.id} value={item.uri}>remove</button>
              </div> 
              : null}
            </div>
          </div>)
        }
       <button className="playlist-btn">Create Playlist</button>
       </div>
       </form>
       <button className="back-btn" onClick={() => history.goBack()}>Back</button>
      </div>
  )
 }

export default Filter