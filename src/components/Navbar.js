import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
// redirect muss noch geändert werden zur richtigen Adresse später
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL

  const handleLogin = () => {
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true`
  }

  return (
    <ul className='Nav'>
      <li>
        <Link to='/'> Home
        </Link>
      </li>
      <li>
        <Link to='/'> Contact
        </Link>
      </li>
      <li>
        |
      </li>
      <li>
        <button onClick={handleLogin}> Login
        </button>
      </li>
    </ul>
  )}

export default Navbar
