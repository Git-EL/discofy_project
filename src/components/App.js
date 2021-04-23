import './App.scss'
import Navbar from './Navbar'
import Home from './Home/Home'
import Intro from './Intro/Intro'
import Redirect from './Redirect/Redirect'
import Selection from './Selection/Selection'
import NotFound from './NotFound/NotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          {/* Umleitung von '/' zu '/test'
                                                <Redirect exact path='/' to='/test' />*/}
          <Route exact path='/' component={Home} />
          <Route path='/intro' component={Intro} />
          <Route path='/redirect' component={Redirect} />
          <Route path='/selection' component={Selection} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
