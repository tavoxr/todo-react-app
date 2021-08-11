import React from 'react'
import TaskForm from './TaskForm';

function TaskContainer(props){

    const {activeTask, setActiveTask, getTasks, editingTask, setEditingTask} = props

    return(
        <div id="task-container" className="card card-body sticky-top ">
            <TaskForm 
                activeTask={activeTask} 
                setActiveTask={setActiveTask} 
                getTasks={getTasks}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                />   
        </div>
    )
}


export default TaskContainer;