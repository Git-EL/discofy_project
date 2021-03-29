import './App.scss'
import Navbar from './components/Navbar'
import discofy_logo from './assets/discofy_logo.svg'
import bgstyle1 from './assets/bg-style1.svg'
import bgstyle2 from './assets/bg-style2.svg'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <img src={discofy_logo} alt='discofy-logo' className='logo' />
      <button className='Getstrt-btn'>
        <a className='First-link' href='/'>GET STARTED</a>
        <a href='/'>GET STARTED</a>
      </button>
      <img src={bgstyle1} alt='bg-style' className='bgstyle1' />
      <img src={bgstyle2} alt='bg-style' className='bgstyle2' />
    </div>
  )
}

export default App
