import '../NotFound/NotFound.scss'
import Navbar from '../Navbar/NavbarIn'
import React from 'react'
import { Link } from 'react-router-dom'
import discofy_logo_small from '../../assets/discofy_logo_small.svg'

const NotFound = () => {
  return (
    <div className='notfound-container'>
      <a href='/'><img src={discofy_logo_small} alt='discofy-logo' className='logo_small' /></a>
      <Navbar />
      <h1>404</h1>
      <h2>Page not found.</h2>
      <button className='notfound-btn'>
        <Link to='/' className='notfound-link'> Back to Home
        </Link>
        <Link to='/'> Back to Home
        </Link>
      </button>
    </div>
  )
}
export default NotFound
