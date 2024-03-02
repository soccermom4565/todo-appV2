import React, { useContext } from 'react'

import { Helmet } from 'react-helmet'
import './navbar.css'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// useContext
const Navbar = (props) => {
  // get user from context
  const { user, setUser } = useContext(UserContext)
  const history = useHistory();
  // logout handling
  function logout () {
    setUser(null)
    localStorage.setItem('user', null)
    // set window loction to root
    window.location.replace('/')
  }
  function login () {
    history.push('/login')
  }
  function register () {
    history.push('/register')
  }
  return (

    <div className="navbar-header">
      <header
        data-thq="thq-navbar"
        className="navbarContainer navbar-navbar-interactive"
      >
        <span className="logo">TUSKADE</span>
        <div data-thq="thq-navbar-nav" className="navbar-menu">
          <nav className="navbar-links"></nav>
          {user ?
            <div className="navbar-buttons">
              <button className="navbar-logout buttonFlat" onClick={logout}>Logout</button>
            </div> :
            <div className="navbar-buttons">
              <a href="/sign-in" className="navbar-login buttonFlat">Login</a>
              <a href="/sign-up" className="buttonFilled">Register</a>
            </div>
          }
        </div>
      </header>
    </div>
  )
}

export default Navbar
