import React,{useState, useEffect} from 'react';
import './App.css';
import TaskContainer from './components/TaskContainer/TaskContainer'
import TaskList from './components/TaskList'
import Pagination from './components/Pagination';

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

    setActiveTask(task)
    setEditingTask(true)

    console.log('editing')
    console.log('task: ', task)

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
        />

        
        <Pagination 
          totalTasks = {tasks.length}
          tasksPerPage = {tasksPerPage}
          paginate={paginate}

        
        /> 

                
        </div>
        
        
      </div>

      

    </div>
  );
}

export default App;
