import './Contact.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'

function Contact ()  {

  const [name] = useState('Suzana Jovanovic');
  const [job] = useState('Full Stack Web Developer');
  const [about] = useState('My interest is largely in line  I am currently still in further training, which I will complete at the end of May. So I can start a job from the end of May/beginning of June. It is important to me that I can be hired remotely, so I applied throughout Deutschland.In my 1+year training as a full stack web developer at DCI, I have developed a lot of websites in Front and Backend.');
  const [name2] = useState('Esther Lee');
  const [job2] = useState('Full Stack Web Developer');
  const [about2 ] = useState('My interest...');
  return (
    <div className="container">

    <div className='Card'>
      <div className='upper-container'>
        <div className='image-container'>
        <img src="data:image/jpeg;base64,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" alt ='' height="100px" width="100px" />
   
       </div>
    </div>

     <div className="botton-container">
       <h3> { name } </h3>
       <h4> {job} </h4>
       <p> { about }</p>
   </div>
   <div className="ft-social">
     <ul className="ft-social-list">
     <li><a href="https://github.com/Suzy1412"><i class="fab fa-github" ></i></a></li>
     <li><a href="mailto:suzy.91@outlook.com"><i class="fas fa-envelope-open-text"></i></a></li>
     <li><a href="https://www.linkedin.com/in/suzana-jovanovic-1b9ab81b2/"><i class="fab fa-linkedin"></i></a></li>
   
     </ul>
   </div>
   </div>
   


   <div className='Card-2'>
      <div className='upper-container'>
        <div className='image-container'>
        <img src="data:image/jpeg;base64,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" alt ='' height="100px" width="100px" />
      
      </div>
   </div>

     <div className="botton-container">
       <h3> { name2 } </h3>
       <h4> {job2} </h4>
       <p> { about2 }</p>
   </div>
   <div className="ft-social">
     <ul className="ft-social-list">
     <li><a href="https://github.com/Git-EL"><i class="fab fa-github" ></i></a></li>
     <li><a href="mailto:lee_esther@live.com"><i class="fas fa-envelope-open-text"></i></a></li>
     <li><a href="https://www.linkedin.com/in/esther-lee-627451205/"><i class="fab fa-linkedin"></i></a></li>

    
     </ul>
   </div>
   </div>

  
   

   


     

     
      <button className="home-button">
        <Link to='/'> Back to Home
        </Link>
      </button>
    </div>
    
  )
}
export default Contact