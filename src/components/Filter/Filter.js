import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './Filter.scss'
import discofy_logo_small from '../../assets/discofy_logo_small.svg'

const Filter = (props) => {
  const getAccessToken = localStorage.getItem('params');
  const spotify_accessToken = JSON.parse(getAccessToken);

  const [selectedTracks, setSelectedTracks] = useState({ playlistTracks: [] });
  const [userID, setUserID] = useState('');
  const [trackID, setTrackID] = useState('');
  const [songSelected, setSongSelected] = useState(0);
  const history = useHistory();

  const addTracks = event => {
   setTrackID(event.target.id)

   let addedTracks = [...selectedTracks.playlistTracks, event.target.value];
   if (selectedTracks.playlistTracks.includes(event.target.value)) {
     addedTracks = addedTracks.filter(track => track !== event.target.value);
   } 
   setSelectedTracks({ playlistTracks: addedTracks }); 
   setSongSelected(selectedTracks.playlistTracks.length + 1)
 };console.log(selectedTracks)
 
  const deleteTrack = event => {
  setTrackID(event.target.id)

  setSelectedTracks(prevState => ({ 
    playlistTracks: prevState.playlistTracks.filter(track =>  track !== event.target.value) 
    }))
    setSongSelected(selectedTracks.playlistTracks.length - 1)
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
    
        let playlistResponse = await axios ({ 
         method: 'POST',
         url: `https://api.spotify.com/v1/users/${userID}/playlists/${parsedData}/tracks`,
         headers: { Authorization: 'Bearer ' + spotify_accessToken.access_token },
         data: JSON.stringify({ uris: selectedTracks.playlistTracks })
         });
         console.log(playlistResponse)
    } catch(error){
          console.log(error)
      }   
   }

   const PopupPlaylist = () => (
    <Popup trigger={<button type="submit" className="playlist-btn">
      <div className='playlist-firstlink'>Create Playlist</div>
      <div className='playlist-secondlink'>Create Playlist</div>
      </button>} position="right center">
      <div className="popup"><i className="far fa-thumbs-up"></i><p className="done">Done!</p><p> Take a look at your new Playlist on <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">Spotify</a>!</p></div>
    </Popup>
  )

  const SelectedTracksCount = () => {
    return <div className="track-counter">You have {songSelected} tracks selected</div>
   }

  return (
    <div className='col-sm-10'>
      <a href="/"><img src={discofy_logo_small} alt='discofy-logo' className='logo_small' /></a>
      <h3>Select your songs</h3>
       <form className="filter-box" onSubmit={createPlaylist}>
        <div key={0} className="tracklist-box">  
        <div className="track-box2">
      <button type="button" className="back-btn" onClick={() => history.goBack()}>
        <i className="fas fa-arrow-left"></i>Back to Category Selection</button>
      <div className="trackbox-titletext">These are your song recommendations for 
      <p className="choiceName">{props.name.includes("_")? props.name.trim().replaceAll("_", " ") : props.name}</p></div>
      <p className="trackbox-text">Hover over the images to get song previews and pick your songs for your Discofy playlist</p>
      </div> 
        <div className="tracklist-insidebox">   
        <div className="tracklist-insideflex"> 
         {props.artiststracklist.length > 0 ? props.artiststracklist.map((item, idx) =>  
            {const audio = new Audio(item.preview_url);
              const playtrack = () => { audio.play(); audio.volume = 0.5; }
              const stoptrack = () => { audio.pause() }
              
               return (
                item.preview_url ?  <div key={idx + 1} className='filter-outerbox'>
                   <div className="filter-imagebox" onMouseOver={playtrack} onMouseLeave={stoptrack}>   

                      <img src={item.album.images[0].url} alt="test" className="trackalbum-image" id={item.id} />
                      <i className="fas fa-plus-circle"></i>
                      <div className="checkbox-container" >
                        <input type="checkbox" className="custom-input " checked={trackID === item.id && 
                            selectedTracks.playlistTracks.includes(item.uri)
                            ? true : selectedTracks.playlistTracks.includes(item.uri) ? true : (trackID === item.id) ? false : undefined                        }
                            id={item.id} value={item.uri} name={item.name} onChange={addTracks} onChangeCapture={stoptrack}/>
                       <span className="checkmark"></span>
                        <div className="checkmark-box"><p>{item.artists[0].name.length > 20 ? item.artists[0].name.substring(0, 18) + "..." : item.artists[0].name}</p>
                        <p>{item.name.length > 39 ? item.name.substring(0, 39) + "..." : item.name}</p></div>
                      </div> 
                   </div>
                </div> 
                :  null
               )
           }) : <p className="missing-message"><i className="far fa-times-circle"></i> Unfortunately, there is no track available for this category.</p>
         }
         </div>
       </div>
    </div>
    <div key={1} className="playlist-box">
    <h2 className="playlist-title">Discofy Playlist</h2>
    <SelectedTracksCount />  
      <div className="play-box1">
        {props.artiststracklist.map((item, idx) => 
        // <div key={idx + 1} value={item.id}>
          <div key={idx + 1}>
            <div className="playlist-preview">{selectedTracks.playlistTracks.includes(item.uri) ? 
              <div className="track-info">
                <button type="button" className="rmv-btn" onClick={deleteTrack} id={item.id} value={item.uri}><i class="fas fa-minus-circle"></i></button>
                <p className="playlist-songtitle">{item.name}</p>
                <p className="playlist-artistname">{item.artists[0].name}</p>
                <p className="playlist-albumtitle">{item.album.album_type} | {item.album.name}</p>
              </div> 
              : null}
            </div>
          </div>)
        }
      </div>
        <div className="play-box2">
         <PopupPlaylist />
        </div>
      </div>
     </form>
    </div>
  )
 }

export default Filter