function Task(){
    return (
        <div className={"task"}>
            <div className={"task-desc"}>Boodschappendoen</div>
            <div className={"task-actions"}>
                <span>Delete</span>
                <span>Edit</span>
                <span>Done</span>
            </div>
        </div>
    );
}

function TaskList(){
    return (
        <div className={"task-list"}>
            <Task />
            <Task />
            <Task />
        </div>
    )
}

export default TaskList;