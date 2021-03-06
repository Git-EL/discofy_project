import './Contact.scss'
import Navbar from '../Navbar/NavbarIn'
import React from 'react'
import { useState } from 'react/cjs/react.development'
import discofy_logo_small from '../../assets/discofy_logo_small.svg'

function Contact () {
  const [name] = useState('Suzana Jovanovic')
  const [job] = useState('Full Stack Web Developer')
  const [name2] = useState('Esther Lee')
  const [job2] = useState('Full Stack Web Developer')

  return (
    <div>
      <Navbar />
      <div className='contact-container'>
      <div className="contact-titlebox">
      <h3 className="contact-title">Contact Information</h3></div>
        <img src={discofy_logo_small} alt='discofy-logo' className='logo_small' />
        <div className='big-container'>
          <div className='Card'>
            <div className='upper-container'>
              <div className='image-container'>
                <img
                  src='https://avatars.githubusercontent.com/u/65951047?s=400&u=b8b905ad11fc8a6e213014149407099b5e5dc978&v=4'
                  alt=''
                  height='100px'
                  width='100px' />
              </div>
            </div>
            <div className='botton-container'>
              <h3>{name}</h3>
              <h4>{job}</h4>
              <p>
               I am a Junior Full Stack Web Developer with 1+ years of experience in project development. My goal is to create creative websites that are also technologically up-to-date.
              </p>
            </div>
            <div className='ft-social'>
              <ul className='ft-social-list'>
                <li>
                  <a href='https://github.com/Suzy1412'><i className='fab fa-github'></i></a>
                </li>
                <li>
                  <a href='mailto:suzy.91@outlook.com'><i className='fas fa-envelope-open-text'></i></a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/in/suzana-jovanovic-1b9ab81b2/'><i className='fab fa-linkedin'></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div className='Card-2'>
            <div className='upper-container'>
              <div className='image-container'>
                <img
                  src='https://avatars.githubusercontent.com/u/65949739?v=4'
                  alt=''
                  height='100px'
                  width='100px' />
              </div>
            </div>
            <div className='botton-container'>
              <h3>{name2}</h3>
              <h4>{job2}</h4>
              <p>
              I am currently a student at the DCI - Digital Career Institute and working towards a degree in Fullstack Web Development. I will graduate in June this year and am interested in a job position as web developer to improve my skills and to meet new challenges.
              </p>
            </div>
            <div className='ft-social'>
              <ul className='ft-social-list'>
                <li>
                  <a href='https://github.com/Git-EL'><i className='fab fa-github'></i></a>
                </li>
                <li>
                  <a href='mailto:lee_esther@live.com'><i className='fas fa-envelope-open-text'></i></a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/in/esther-lee-627451205/'><i className='fab fa-linkedin'></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
     
      </div>
   
  )
}
export default Contact
