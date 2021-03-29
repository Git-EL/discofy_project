import './App.scss'
import Navbar from './components/Navbar'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <h1>Brandname</h1>
      <button className='Getstrt-btn'>
        <a className='First-link' href='www.google.de'>GET STARTED</a>
        <a href='www.google.de'>GET STARTED</a>
      </button>
    </div>
  )
}

export default App
