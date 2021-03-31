import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul className='Nav'>
      <li>
        <Link to='/'> Home
        </Link>
      </li>
      <li>
        |
      </li>
      <li>
        <Link to='/'> Contact
        </Link>
      </li>
    </ul>
  )}

export default Navbar
