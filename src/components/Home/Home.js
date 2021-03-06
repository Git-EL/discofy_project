import './Home.scss'
import Navbar from '../Navbar/NavbarIn'
import { Link } from 'react-router-dom'
import discofy_logo from '../../assets/discofy_logo.svg'

const Home = () => {
  return (
    <div className='home-container'>
      <Navbar />
      <img src={discofy_logo} alt='discofy-logo' className='logo' />
      <button className='getstarted-btn'>
        <Link to='/intro' className='first-link'> Get started
        </Link>
        <Link to='/intro'> Get started
        </Link>
      </button>
    </div>
  )
}

export default Home
