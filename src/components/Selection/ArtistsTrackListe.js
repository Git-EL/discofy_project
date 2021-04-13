import './ArtistsTrackListe.scss'
import React from "react";
// import ReactAudioPlayer from 'react-audio-player';


const ArtistsTrackListe = props => {

return (
   <div className='col-sm-10'>
     <div key={0} className="track-liste">
       {props.artiststracklist.map((item, idx) =>  
       { const audio = new Audio(item.preview_url);
        function playtrack() { audio.play();}
        function stoptrack() { audio.pause();}
 return (
       <div key={idx + 1} value={item.id} onMouseOver={playtrack} onMouseLeave={stoptrack}>
        {item.preview_url ? <img src={item.album.images[0].url} alt="test" className="trackalbum-image" id={item.id} width="100" height="100"/> : null}
       </div>)})}
     </div>
   </div>
 )
 }

export default ArtistsTrackListe