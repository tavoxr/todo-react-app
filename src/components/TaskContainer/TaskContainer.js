import React from 'react'
import TaskForm from './TaskForm';

function TaskContainer(props){

    const {activeTask, setActiveTask, getTasks} = props

    return(
        <div id="task-container" className="card card-body">
            <TaskForm activeTask={activeTask} setActiveTask={setActiveTask} getTasks={getTasks}/>   
        </div>
    )
}


export default TaskContainer;