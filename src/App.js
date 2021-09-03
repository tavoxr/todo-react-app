import React,{useState, useEffect} from 'react';
import './App.css';
import TaskContainer from './components/TaskContainer/TaskContainer'
import TaskList from './components/TaskList'
import Pagination from './components/Pagination';
import getCookie from './getCookie';

function App() {

  const [tasks, setTasks] = useState([])
  const [activeTask, setActiveTask] = useState({id:null, name: '', completed: false})
  const [editingTask, setEditingTask] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [tasksPerPage, setTasksPerPage] = useState(10)



  const getTasks = async ()=>{
    const url = 'http://127.0.0.1:8000/api/task-list/'
    const response = await fetch(url);
    const data =  await response.json();
    
    console.log('data', data)
    console.log('tasks', data)
    
    setTasks(data)
  
  }

  const startEditing = (task)=>{

    let taskId = task.id

    // check if task is the same in order to activate or cancel  edition when button is pressed
    if(activeTask.id != taskId){
      setActiveTask(task)
      setEditingTask(true)
    }else{
      setActiveTask({id:null, name: '', completed: false}) 
      setEditingTask(false)

    }

   
        
        
     
   

    console.log('editing')
    console.log('task: ', task)

  }

  const deleteTask = async (task)=>{
    let csrftoken =  getCookie('csrftoken')
    setEditingTask(false)
    setActiveTask({id:null, name: '', completed: false})
    const url = `http://127.0.0.1:8000/api/task-delete/${task.id}/`
    
    const response = await fetch(url,{
                                  method: 'DELETE',
                                  headers: { 'Content-Type': 'application/json',
                                            'X-CSRFToken': csrftoken,
                                  }
                      })

    getTasks()


  }


  useEffect(  ()=>{
      getTasks() 

  },[])

  // Get current posts
  const indexOfLastTask =  currentPage * tasksPerPage
  const indexOfFirstTask =  indexOfLastTask - tasksPerPage
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

  // Change Current page
  const  paginate = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }

  const strikeUnstrike = async (task)=>{
    task.completed = !task.completed
    console.log('task status', task.completed)
    setEditingTask(false)
    setActiveTask({id:null, name: '', completed: false})

    let csrftoken =  getCookie('csrftoken')
    let url = `http://127.0.0.1:8000/api/task-update/${task.id}/`

    const response = await fetch(url,{
      method: 'PUT',
      headers:{
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,

      },
      body: JSON.stringify({...task, completed: task.completed})
    })

    getTasks()
    
  } 
  
  
  return (
    
    <div className="container">

      <div className="row mt-5">
        <div className="col-sm-12 col-md-10 col-lg-10 m-auto">

        <TaskContainer 
            activeTask={activeTask} 
            setActiveTask={setActiveTask} 
            getTasks={getTasks}  
            editingTask={editingTask}
            setEditingTask={setEditingTask}
        />

        <TaskList 
            tasks = {currentTasks} 
            startEditing={startEditing} 
            editingTask={editingTask}
            deleteTask = {deleteTask}
            strikeUnstrike={strikeUnstrike}
            activeTask={activeTask}
        />

        
        <Pagination 
          totalTasks = {tasks.length}
          tasksPerPage = {tasksPerPage}
          currentPage={currentPage}
          setCurrentPage = {setCurrentPage}
          paginate={paginate}


        
        /> 

                
        </div>
        
        
      </div>

      

    </div>
  );
}

export default App;
