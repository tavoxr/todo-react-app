import React from 'react';


function TaskList(props){

    const {taskList, startEditing} = props

    return(
        <div id="list-wrapper" className="mt-3">
                    
                {taskList.map((task)=>{
                    return(

                        <div key={task.id}  className="card card-body mb-1 d-flex flex-row " id="task-card">                
                            <p id="task"  >{task.name}</p>    
                            <button className="btn btn-sm btn-outline-warning me-3 task-btn" onClick={()=>startEditing(task)}>Edit</button>
                            <button className="btn btn-sm btn-outline-light task-btn" >-</button>
                        </div>
                    )
                })}
        </div>
    );
}


export default TaskList;