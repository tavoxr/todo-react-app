import React from 'react'



function TaskForm(){

return(
  <form id="form" className="form">
      <div className="row ">
          <div className="input-group">
            <input className="form-control w-75" id="name" placeholder="task name" name="name" />
          
          
            <button  id="submit" className="form-control btn btn-success w-25" name="add">Save</button>
          </div>
      </div>

  </form>  
);

}



export default TaskForm;



