import React,{ useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './sign-in.css'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { UserContext } from '../App'

const SignIn = (props) => {
  // alert('signin')
  // const navigate = useNavigate();

  const history= useHistory();
  const { user, setUser } = useContext(UserContext)

  // use effect code to check if user is present in context
  useEffect(()=>{
    if(user){
      history.push('/dashboard')
    }
  })
  function handleSubmit() {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: document.getElementById('username').value, password: document.getElementById('password').value }),
    }).then((response) => {
      return response.json()
    }).then(data => {
      if(data["error"]){
        alert("Wrong User details try again!")
        return
      }
      // save data in user object
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      history.push('/dashboard')
      // window.location.replace("/dashboard")
    })
  }
  return (
    <div className="sign-in-container">
      <Helmet>
        <title>SignIn</title>
        <meta property="og:title" content="SignIn" />
      </Helmet>
      <h1 className="sign-in-text">
        <span>Sign In</span>
        <br></br>
      </h1>
      <form className="sign-in-form">
        <input
          type="text"
          id="username"
          name="username"
          required
          autoFocus
          placeholder="Username"
          className="input"
        />
        <input
          type="text"
          id="password"
          name="password"
          required
          placeholder="Password"
          className="sign-in-textinput1 input"
        />
        <button type="button" className="sign-in-button button" onClick={handleSubmit}>
          <span>
            <span>Sign In</span>
            <br></br>
          </span>
        </button>
      </form>
      <a href="/sign-up" className="sign-in-link">
        <span>New to tuskade? Then lets get started!</span>
        <br></br>
      </a>

    </div>
  )
}

export default SignIn
