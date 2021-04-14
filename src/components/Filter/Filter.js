import React from "react";
import { useHistory } from 'react-router-dom'
// import ReactAudioPlayer from 'react-audio-player';


const Filter = (props) => {
  const history = useHistory();
  return (
    <div className='col-sm-10, filter-container'>
      <div key={0} className="track-liste">
        
        {props.artiststracklist.map((item, idx) =>  
        { const audio = new Audio(item.preview_url);
         function playtrack() { audio.play();}
         function stoptrack() { audio.pause();}
  return (
        <div key={idx + 1} value={item.id} onMouseOver={playtrack} onMouseLeave={stoptrack}>
         {item.preview_url ? <img src={item.album.images[0].url} alt="test" className="trackalbum-image" id={item.id} width="100" height="100"/> : null}
        </div>)})}
      </div> <button className="back-btn" onClick={() => history.goBack()}>Back</button>
    </div>
  )
 }

export default Filter


// import './Filter.scss'
// import { useHistory } from 'react-router-dom'
// // import {SelectionTest} from '../Selection/Selection'
// // import React, {useContext} from 'react'

// function Filter (props) {
//   const history = useHistory();

//   return (
//     <div className='filter-container'>
//        <button className="back-btn" onClick={() => history.goBack()}>Back 
//           </button>
//     <div key={0} className="track-liste">
//       {props.artiststracklist2.map((item, idx) =>  
//       { const audio = new Audio(item.preview_url);
//        function playtrack() { audio.play();}
//        function stoptrack() { audio.pause();}
// return (
//       <div key={idx + 1} value={item.id} onMouseOver={playtrack} onMouseLeave={stoptrack}>
//        {item.preview_url ? <img src={item.album.images[0].url} alt="test" className="trackalbum-image" id={item.id} width="100" height="100"/> : null}
//       </div>)})}
//     </div>
//     </div>
    
//   )
// }

// export default Filter
