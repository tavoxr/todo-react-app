import React from 'react'
import getCookie from '../../getCookie'


function TaskForm(props) {


    const { activeTask, setActiveTask, getTasks, editingTask, setEditingTask } = props

   

    
    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        console.log(`name: ${name}, value: ${value}`)

        setActiveTask( { ...activeTask, name: value })
       
    }

    const handleSubmit = (e) => {
        const csrftoken = getCookie('csrftoken');
        e.preventDefault()
        
        console.log('submit')
        console.log('activeTask ', activeTask)
        
        if(editingTask === true){

            const url = `http://localhost:8000/api/task-update/${activeTask.id}/`

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,        
                },
                body: JSON.stringify({name: activeTask.name, completed: activeTask.completed})
            }).then((response) => {
                response.json()
                console.log('Task Edited: ', response)

                setEditingTask(false)
                setActiveTask({ name: '', completed: false })
                getTasks()

            }).catch((error)=>{
                console.log('ERROR: ', error)
            })

        }else{        
            const url = "http://localhost:8000/api/task-create/"
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,        
                },
                body: JSON.stringify({name: activeTask.name, completed: activeTask.completed})
            }).then((response) => {
                response.json()
                console.log('task created: ', response)

                setActiveTask({ name: '', completed: false })
                getTasks()

            }).catch((error)=>{
                console.log('ERROR: ', error)
            })

        }

    }

    


    return (
        <form id="form" className="form" onSubmit={handleSubmit}>
            <div className="row ">
                <div className="input-group">
               
                    <input className="form-control w-75" id="name" value={activeTask.name} placeholder="task name" name="name" onChange={handleChange} />

                    <button id="submit" className={`form-control btn ${editingTask ? "btn-secondary": "btn-warning" } w-25`}  name="add">{editingTask ? "Edit" : "Save" } </button>
                </div>
            </div>

        </form>
    );

}


export default TaskForm;



