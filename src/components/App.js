import './App.scss'
import Navbar from './Navbar'
import Home from './Home/Home'
import Intro from './Intro/Intro'
import Selection from './Selection/Selection'
import Redirect from './Redirect/Redirect'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import bgstyle1 from '../assets/bg-style1.svg'
import bgstyle2 from '../assets/bg-style2.svg'

function App () {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <img src={bgstyle1} alt='bg-style' className='bgstyle1' />
        <img src={bgstyle2} alt='bg-style' className='bgstyle2' />
        <Switch>
          {/* Umleitung von '/' zu '/test' 
        <Redirect exact path='/' to='/test' />*/}
        <Route exact path='/' component={Home} />
        <Route path="/Intro" component={Intro} />
        <Route path="/Redirect" component={Redirect} />
        <Route path="/Selection" component={Selection} />
        </Switch>
      </div>
    </Router>
  )
}


export default App
