import React, { useEffect, useContext } from 'react'

import { Helmet } from 'react-helmet'
import './list.css'
import { UserContext } from '../App'
import Task from './Task'


const List = (props) => {
  const { user, setUser } = useContext(UserContext)
  const [tasks, setTasks] = React.useState([])
  const [listName, setListName] = React.useState('')
  const [newTask, setNewTask] = React.useState('')
  // usehistory
  const history = props.history

  const name = new URLSearchParams(props.location.search).get('name')
  const id = new URLSearchParams(props.location.search).get('id')

  useEffect(() => {
    // setTimeout(()=>{
    fetch(`http://localhost:3001/lists/${id}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...user
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
    // },100)
    // get the search param id and fetch data from api
    // set list name from serahc params with name
    setListName(name)
  }, [])

  function handleTaskInputChange(e) {
    setNewTask(e.target.value)
  }
  function handleNewTaskSubmit() {
    fetch(`http://localhost:3001/lists/${id}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...user
      },
      body: JSON.stringify({ name: newTask, status: 'TODO' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data])
        setNewTask('')
      })
  }


  const columnTaskClasses={
    'list-state-column0':'todo-task',
    'list-state-column1':'in-progress-task',
    'list-state-column2':'done-task',
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const dropZoneClasses=[...ev.target.classList]
    if(!dropZoneClasses.includes("status-column") && !dropZoneClasses.includes("list")){
      return
    }
    const taskId = ev.dataTransfer.getData("text");
    const newStatus=ev.target.getAttribute("data-status-type")
    // make a patch request to change todo status
    fetch(`http://localhost:3001/todos/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...user
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setTasks([])
        setTasks([...(tasks.filter((task) => task.id !== data.id)), data])
      })
  }
  function dropOnDelete(ev) {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("text");
    // make a delete request to delete todo
    if(confirm(`Do you want to delete task ${document.getElementById(taskId).innerText}?`)){
      fetch(`http://localhost:3001/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...user
        },
      }).then((response) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
      })
    }
  }
  function handleListDelete() {
    if(!confirm(`Do you want to delete list "${listName}"?`)){
      return
    }
    fetch(`http://localhost:3001/lists/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...user
      },
    }).then((response) => {
      history.push('/dashboard')
    })
  }
  return (
    <div className="list-container">
      <Helmet>
        <title>List</title>
        <meta property="og:title" content="List - Tuskade" />
      </Helmet>
      <h1 className="list-text">{listName} <button onClick={handleListDelete}  onDragOver={allowDrop} onDrop={dropOnDelete} className='delete-btn'>delete</button></h1>
      {/* <DndContext onDragStart={(e) => { console.log(e) }}> */}
        <div className="list-kanban-board">
          <div className="list-state-column0  status-column" onDrop={drop} onDragOver={allowDrop} data-status-type="TODO">
            <h2>Todo</h2>
            <ul className="list-task-list list" data-status-type="TODO">
              {/* filter out tasks with status="TODO" */}
              {tasks
                .filter((task) => task.status === 'TODO')
                .map((task, i) => {
                  // if (i == 0) {
                    // return <Task setTasks={setTasks} tasks={tasks} key={task.id} name={task.name} taskType="todo-task" ref={setDragRef} style={dragStyle}  {...listeners} {...attributes} />
                  // }
                  return <Task setTasks={setTasks} tasks={tasks} key={task.id}  id={task.id} name={task.name} taskType="TODO" draggable={true} onDragStart={drag}/>
                })}
            </ul>
          </div>
          <div className="list-state-column1 status-column" onDrop={drop} onDragOver={allowDrop} data-status-type="IN_PROGRESS">
            <h2>In Progress</h2>
            <ul className="list-task-list1 list"  data-status-type="IN_PROGRESS">
              {/* filter out tasks with status="IN_PROGRESS" */}
              {tasks
                .filter((task) => task.status === 'IN_PROGRESS')
                .map((task) => (
                  <Task setTasks={setTasks} tasks={tasks} key={task.id}  id={task.id} name={task.name} taskType="IN_PROGRESS" draggable={true} onDragStart={drag}/>
                  // <Task task={task} key={task.id} taskType="IN_PROGRESS" />
                ))}
            </ul>
          </div>
          <div className="list-state-column2  status-column" onDrop={drop} onDragOver={allowDrop} data-status-type="DONE">
            <h2>
              <span>Done</span>
              <br></br>
            </h2>
            <ul className="list-task-list2 list" data-status-type="DONE">
              {/* filter out tasks with status="DONE" */}
              {tasks
                .filter((task) => task.status === 'DONE')
                .map((task) => (
                  // <Task task={task} key={task.id} taskType="DONE" />
                  <Task setTasks={setTasks} tasks={tasks} key={task.id}  id={task.id} name={task.name} taskType="DONE" draggable={true} onDragStart={drag}/>

                ))}
            </ul>
          </div>
        </div>

      {/* </DndContext> */}
      <div className="list-container2">
        <input type="text" placeholder="some cool task" className="input" value={newTask} onChange={handleTaskInputChange} />
        <button name="Add" type="button" className="button" onClick={handleNewTaskSubmit}>
          <span>
            <span>Add</span>
            {/* <br></br> */}
          </span>
        </button>
      </div>
    </div>
  )
}

export default List
