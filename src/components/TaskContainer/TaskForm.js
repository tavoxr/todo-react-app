import React from 'react'
import getCookie from '../../getCookie'
import {toast } from 'react-toastify';

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

            const url = `${process.env.REACT_APP_BASE_URL}/api/task-update/${activeTask.id}/`

            fetch(url, {
                method: 'PUT',
                mode: 'no-cors',
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

                toast.info(' 📝 Task edited!', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                    });


            }).catch((error)=>{
                console.log('ERROR: ', error)
            })

        }else{        
            const url = `${process.env.REACT_APP_BASE_URL}/api/task-create/`
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
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

                toast.success('😀 New task created!', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                    });


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



