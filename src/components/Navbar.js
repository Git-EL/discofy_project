import './Navbar.scss'
import React, { useState } from "react";


const Navbar = () => {
  const spotify_clientId = process.env.REACT_APP_CLIENT_ID
  const spotify_authUrl = process.env.REACT_APP_AUTHORIZE_URL
  // redirect muss noch geändert werden zur richtigen Adresse später
  const spotify_redirectUrl = process.env.REACT_APP_REDIRECT_URL
  const handleLogin = () => {
    window.location = `${spotify_authUrl}?client_id=${spotify_clientId}&redirect_uri=${spotify_redirectUrl}&response_type=token&show_dialog=true`
  }
  const [navLinkOpen, navLinkToggle] = useState(false);
  const handleNavLinksToggle = () => {
    navLinkToggle(!navLinkOpen)
  };

  const renderClasses = () => {
     let classes = "navlinks";
     if (navLinkOpen) {
       classes += " active"
     }
     return classes
  }


  return (
    <nav>
    <ul className={renderClasses()}>
      <li className="link">
        <a href="/">HOME</a></li>
      <li className="link">
        <a href="/">CONTACT</a></li>
      <li className="link">
        <a href="/"> <button onClick={handleLogin}>LOGIN</button></a></li>
      </ul>
      <div onClick={handleNavLinksToggle} className="hamburger-toggle">
        <i className="fas fa-bars fa-lg"></i>
      </div>
      </nav>
  )};


export default Navbar