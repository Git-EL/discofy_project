import './Home.scss'
import {Link} from 'react-router-dom'
import discofy_logo from '../../assets/discofy_logo.svg'

function Home () {
  return (
    <div className='HomeContainer'>
      <img src={discofy_logo} alt='discofy-logo' className='logo' />
      <button className='Getstrt-btn'>
        <Link to='/Intro' className='First-link'> Get started
        </Link>
        <Link to='/Intro'> Get started
        </Link>
      </button>
    </div>
  )
}

export default Home
