import React from 'react';


function TaskList(props){

    const {tasks, startEditing, deleteTask, editingTask ,  strikeUnstrike, activeTask} = props

    return(
        <div id="list-wrapper" className="mt-3">
                    
                {tasks.map((task)=>{
                    return(

                        <div key={task.id}  className="card card-body mb-1 d-flex flex-row " id="task-card"  >                
                            <div className="flex-grow-1" onClick={()=> strikeUnstrike(task) }>
                            {task.completed ? ( 
                                <strike id="task"  >{task.name}</strike>    
                            ) : (   
                                <p id="task"  >{task.name}</p>    
                             )
                            }
                            </div>
                            <div>
                                {activeTask.id == task.id ?(
                                    <button className={`btn btn-sm ${editingTask  ? "btn-outline-danger": "btn-outline-warning"} me-3 task-btn`} onClick={()=>startEditing(task)}>{editingTask ? "Cancel": "Edit"} </button>
                                ) :(
                                    <button className={`btn btn-sm btn-outline-warning me-3 task-btn`} onClick={()=>startEditing(task)}>Edit</button>

                                )  
                        
                                
                                }
                           
                            <button className="btn btn-sm btn-outline-light task-btn" onClick={()=> deleteTask(task)} >-</button>
                            </div>
                        </div>
                    )
                })}
              

        </div>
    );
}


export default TaskList;