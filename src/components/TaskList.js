import React from 'react';




function TaskList(props){


   
    const {taskList} = props
    return(
        <div id="list-wrapper" className="mt-3">
            
            
                {taskList.map((task)=>{
                    return(
                        
                        <div key={task.id} className="card card-body mb-1">
                            <h6>{task.name}</h6>
                        </div>
                        
                    )


                })}
            
        </div>
    );

}


export default TaskList;