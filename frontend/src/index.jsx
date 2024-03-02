import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import SignIn from './views/sign-in'
import Navbar from './views/navbar'
import SignUp from './views/sign-up'
import Dashboard from './views/dashboard'
import Footer from './views/footer'
import List from './views/list'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={SignIn} exact path="/sign-in" />
        <Route component={Navbar} exact path="/navbar" />
        <Route component={SignUp} exact path="/sign-up" />
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={Footer} exact path="/footer" />
        <Route component={List} exact path="/list" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
