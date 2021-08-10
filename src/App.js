import React,{useState, useEffect} from 'react';
import './App.css';
import TaskContainer from './components/TaskContainer/TaskContainer'
import TaskList from './components/TaskList'

function App() {

  const [taskList, setTaskList] = useState([])
  const [activeTask, setActiveTask] = useState({id: null, name: '', completed: false})
  const [editingTask, setEditingTask] = useState(false)

  useEffect( async ()=>{

    const url = 'http://127.0.0.1:8000/api/task-list/'
    const response = await fetch(url);
    const data =  await response.json();
    
    console.log('tasks', data)
    
    setTaskList(data)
    
  },[])

  
  
  return (
    
    <div className="container">

      <div className="row mt-5">
        <div className="col-sm-12 col-md-10 col-lg-10 m-auto">

        <TaskContainer/>
        <TaskList taskList = {taskList}/>
        </div>
        
        
      </div>

      

    </div>
  );
}

export default App;
