import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './style.css';
import Home from './views/home.jsx';
import SignIn from './views/sign-in.jsx';
import Navbar from './views/navbar.jsx';
import SignUp from './views/sign-up.jsx';
import Dashboard from './views/dashboard.jsx';
import Footer from './views/footer.jsx';
import List from './views/list.jsx';
import NotFound from './views/not-found.jsx';

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // const handleSignIn = (username, password) => {
  //   // Add your authentication logic here
  //   // For example, you can make an API call to validate the user
  //   // and then set the user object in the state and local storage
  //   const user = { username, password };
  //   setUser(user);
  //   localStorage.setItem('user', JSON.stringify(user));
  // };

  // const handleSignOut = () => {
  //   setUser(null);
  //   localStorage.removeItem('user');
  // };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar/>
         <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <Route exact path="/sign-in">
          {user ? <Redirect to="/dashboard" /> : <SignIn />}
        </Route>
        <Route exact path="/sign-up">
          {user ? <Redirect to="/dashboard" /> : <SignUp />}
        </Route>
        <Route exact path="/dashboard">
          {/* {user ? <Dashboard /> : <Redirect to="/sign-in" />} */}
          <Dashboard/>
        </Route>
        {/* <Route exact path="/navbar" component={Navbar} /> */}
        {/* <Route exact path="/footer" component={Footer} /> */}
        <Route exact path="/list" component={List} />
        <Route path="**" component={NotFound} />
        <Redirect to="**" />
      </Switch>
    </Router>
    <Footer/>

    </UserContext.Provider>
  );
};

export default App;

export const useUserContext = () => {
  return useContext(UserContext);
};