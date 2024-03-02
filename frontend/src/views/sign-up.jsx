import React,{useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './sign-up.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App'

const SignUp = (props) => {
  // usenavigate code
  const history= useHistory();
  const { user, setUser } = useContext(UserContext)

  function handleSubmit(){
    fetch('http://localhost:3001/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: document.getElementById('username').value, password: document.getElementById('password').value}),
    }).then((response) => {
      return response.json()
    }).then(data=>{
      if(data["error"]){
        alert("Wrong User details try again!")
        return
      }
      // save data in user object
      localStorage.setItem('user', JSON.stringify(data))
      history.push('/dashboard')
      // window.location.replace("/dashboard")

    })
  }
  return (
    <div className="sign-up-container">
      <Helmet>
        <title>SignUp - Tuskade</title>
        <meta property="og:title" content="SignUp - Tuskade" />
      </Helmet>
      <h1 className="sign-up-text">
        <span>Sign Up</span>
        <br></br>
      </h1>
      <form className="sign-up-form">
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
          className="sign-up-textinput1 input"
        />
        <button type="button" className="sign-up-button button" onClick={handleSubmit}>
          <span>
            <span>Sign Up</span>
            <br></br>
          </span>
        </button>
      </form>
      <a href="/sign-in" className="sign-in-link">
        <span>Already have an account? Then lets start task crunching!</span>
        <br></br>
      </a>
    </div>
  )
}

export default SignUp
