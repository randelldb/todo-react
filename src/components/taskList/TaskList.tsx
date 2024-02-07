import {useEffect, useState} from "react";
import InputTask from "../inputTask/InputTask.tsx";


const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [editing, setEditing] = useState({});

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const response = await fetch('http://localhost:8080/tasks');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setTasks(data);

    };

    const deleteTask = async (taskId: string) => {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
            method: 'DELETE', // Specify the method to use
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setTasks(currentTasks => currentTasks.filter(task => {
            return task._id !== taskId;
        }));
    }

    const toggleTask = async (taskId: string, state:boolean) => {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({state: !state})
        });

        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        await getTasks();
        console.log('State updated successfully:', data);
    }

    const toggleEditing = (id) => {
        setEditing((prev) => {
            return ({...prev, [id]: !prev[id]});
        });
    };



    return (
        <div>
            <InputTask onTaskCreated={getTasks}/>
            <div className={"task-list"}>
                {tasks.map((task: any, index) => (
                    <div key={index} className={`task ${task.state ? 'done' : ''}`}>
                        {editing[task._id] ? (<div><input type={"text"}/></div>) : (
                            <div className={"task-desc"}>
                                {task.task}
                            </div>
                        )}
                        <div className={"task-actions"}>
                            <span onClick={() => toggleTask(task._id, task.state)}>{task.state ? 'Uncheck' : 'Check'}</span>
                            <span onClick={() => toggleEditing(task._id)}>Edit</span>
                            <span onClick={() => deleteTask(task._id)}>X</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
)
}

export default TaskList;
