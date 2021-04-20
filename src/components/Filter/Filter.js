import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Filter.scss'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const Filter = (props) => {
  const getAccessToken = localStorage.getItem('params')
  const spotify_accessToken = JSON.parse(getAccessToken)

  const [selectedTracks, setSelectedTracks] = useState({ playlistTracks: [] })
  const [userID, setUserID] = useState('')
  // const [playlistID, setPlaylistID] = useState('')
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

  setSelectedTracks(prevState => ({ 
    playlistTracks: prevState.playlistTracks.filter(track =>  track !== event.target.value) 
    }))
  };

   useEffect(() => {
     axios('https://api.spotify.com/v1/me', {
       method: 'GET',
       headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token }
     }).then((userIDResponse) => {
       setUserID(userIDResponse.data.id)
       console.log(userIDResponse)
       console.log('userID: ' + userID)})
   },[spotify_accessToken.access_token, userID]);


   const createPlaylist = async (e) => {
    e.preventDefault();

    try{
   let playlistIDResponse = await axios ({ 
    method: 'POST',
    url: `https://api.spotify.com/v1/users/${userID}/playlists`,
      headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token  },
      body: { 'public': false },
      data: JSON.stringify({
        name: 'Discofy Playlist',
        description: 'Hello! I am your newly created Discofy Playlist'
      })
    });
    let parsedData = await playlistIDResponse.data.id
    console.log(playlistIDResponse)
      //  setPlaylistID(parsedData)
      // console.log('playlistID: ' + playlistID) 
        let playlistResponse = await axios ({ 
         method: 'POST',
         url: `https://api.spotify.com/v1/users/${userID}/playlists/${parsedData}/tracks`,
         headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token },
         data: JSON.stringify({ uris: selectedTracks.playlistTracks })
         });
         console.log(playlistResponse)}
      catch(error){
        console.log(error)
      }   
  
    }
  const PopupExample = () => (
    <Popup trigger={<button className="playlist-btn">Create Playlist</button>} position="right center">
      <div className="popup">Done! Take a look at your new Playlist on Spotify!</div>
    </Popup>
  )



  // checked={false}

  return (
    <div className='col-sm-10'>
      <h3>Select your songs</h3>
      <form onSubmit={createPlaylist} className="filter-box">
      <div key={0} className="tracklist-box">  
      <div className="tracklist-insidebox">  
        {props.artiststracklist.map((item, idx) =>  
          {const audio = new Audio(item.preview_url);
            const playtrack = () => { audio.play(); audio.volume = 0.8; }
            const stoptrack = () => { audio.pause() }
            return (
              item.preview_url ?  <div key={idx + 1} value={item.id} className='filter-outerbox'>
                 <div className="filter-imagebox" onMouseOver={playtrack} onMouseLeave={stoptrack}><img src={item.album.images[0].url} alt="test" className="trackalbum-image" id={item.id} />
                    <div className="checkbox-container" >
                      <input type="checkbox" className="custom-input " id={item.id} value={item.uri} name={item.name} onChange={addTracks} onChangeCapture={stoptrack}/>
                      <span className="checkmark"></span>
             <div className="checkmark-box"><p>{item.artists[0].name}</p><p>{item.name.length > 33 ? item.name.substring(0, 33) + " . . ." : item.name}</p></div>
                   </div> 
                  </div>
                  </div> 
                : null      
             )
          })
        }
      </div>

      <div className="track-box2">
      <button className="back-btn" onClick={() => history.goBack()}>Back</button>
      </div> 

  </div>


      
      <div key={1} className="playlist-box">
      <div className="play-box1">
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
        </div>
        <div className="play-box2">
        <PopupExample />
    
       </div>
        </div>
       </form>
      </div>
  )
 }

export default Filter