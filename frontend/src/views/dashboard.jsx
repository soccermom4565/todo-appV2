import React,{ useState, useEffect, useContext } from 'react'

import { Helmet } from 'react-helmet'

import './dashboard.css'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Dashboard = (props) => {
  // consume context
  const { user, setUser } = useContext(UserContext)

  const history = useHistory();

  // alert("hello");
  // list state
  const [list, setList] = useState([])
// state for new list input
  const [newListName, setNewListName] = useState('')


  // useeffect code
  useEffect(() => {
    // check react user context api object is null or not
    setTimeout(()=>{
      if (!user) {
        history.push("/sign-in")
      }
    },1000)


    fetch('http://localhost:3001/lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...user,
      },
    }).then((response) => {
      return response.json()
    }).then(data => {
      console.log(data)
      setList(data)
    })
  }, [])

  function handleListInputChange(e){
    setNewListName(e.target.value)
  }
  function handleNewListSubmit(){
    // check if new list name is is already present in the list
    if(list.find(item => item.name === newListName)){
      alert("List name is already present")
      return
    }
    fetch('http://localhost:3001/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...user,
      },
      body: JSON.stringify({name: newListName}),
    }).then((response) => {
      return response.json()
    }).then(data => {
      setList([...list, data])
      setNewListName('')
    })
  }

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Dashboard - Tuskade</title>
        <meta property="og:title" content="Dashboard - Tuskade" />
      </Helmet>
      <h1 className="dashboard-text">
        <span>Greetings Pratik!</span>
        <br></br>
      </h1>
      <ul className="dashboard-ul list">
        <h3 className="dashboard-text1">Your List</h3>
        {list.map((item, index) => {
          return (
            <li className="list-item" key={item.id}>
              <Link to={"/list?id="+item.id+"&name="+item.name}>
                <button type="button" className="button">
                  <span>
                    <span>{item.name}</span>
                    <br></br>
                  </span>
                </button>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="dashboard-container1"></div>
      <div className="dashboard-container2">
        <input type="text" placeholder="some cool list" className="input" value={newListName} onChange={handleListInputChange} />
        <button name="Add" type="button" className="button" onClick={handleNewListSubmit}>
          <span>
            <span>Add</span>
            <br></br>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Dashboard
