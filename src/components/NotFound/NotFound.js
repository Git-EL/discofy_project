import './NotFound.scss'
import Navbar from '../Navbar/NavbarIn'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound-container'>
      <Navbar />
      <h1>404</h1>
      <h2>Page not found.</h2>
      <button>
        <Link to='/'> Back to Home
        </Link>
      </button>
    </div>
  )
}
export default NotFound
