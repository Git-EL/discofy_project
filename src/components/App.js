import './App.scss'
import React, { useState, useEffect } from 'react'
import Home from './Home/Home'
import Intro from './Intro/Intro'
import Redirect from './Redirect/Redirect'
import Selection from './Selection/Selection'
import NotFound from './NotFound/NotFound'
import Contact from './Contact/Contact'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  const [expiryTime, setExpiryTime] = useState('0')

  useEffect(() => {
    let expiryTime
    try {
      expiryTime = JSON.parse(localStorage.getItem('expiry_time'))
    } catch (error) {
      expiryTime = '0'
    }
    setExpiryTime(expiryTime)
  }, [])

  const isValidSession = () => {
    const currentTime = new Date().getTime()
    const expiryTimer = expiryTime
    const isSessionValid = currentTime < expiryTimer

    return isSessionValid
  }

  return (
    <Router>
      <div className='App'>        
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/intro' component={Intro} />
          <Route path='/redirect' render={(props) => (
            <Redirect isValidSession={isValidSession} setExpiryTime={setExpiryTime} {...props} />)} />
          <Route path='/selection' render={(props) => (
            <Selection isValidSession={isValidSession} {...props} />)} />
          <Route path='/contact' component={Contact} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
