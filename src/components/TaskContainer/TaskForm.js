import React from 'react'



function TaskForm(props) {


    const { activeTask, setActiveTask, getTasks } = props

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    
    
    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        console.log(`name: ${name}, value: ${value}`)

        setActiveTask({ name: value })

    }


    const handleSubmit = (e) => {
        const csrftoken = getCookie('csrftoken');
        e.preventDefault()
        
        console.log('submit')
        console.log('activeTask ', activeTask)
        
        const url = "http://localhost:8000/api/task-create/"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,        
            },
            body: JSON.stringify(activeTask)
        }).then((response) => {
            response.json()
            console.log('task created: ', response)

            setActiveTask({ name: '', completed: false })
            getTasks()

        }).catch((error)=>{
            console.log('ERROR: ', error)
        })

    }

    return (
        <form id="form" className="form" onSubmit={handleSubmit}>
            <div className="row ">
                <div className="input-group">
                    <input className="form-control w-75" id="name" value={activeTask.name} placeholder="task name" name="name" onChange={handleChange} />

                    <button id="submit" className="form-control btn btn-warning w-25"  name="add">Save</button>
                </div>
            </div>

        </form>
    );

}


export default TaskForm;



