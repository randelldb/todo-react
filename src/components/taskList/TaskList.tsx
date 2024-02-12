import { useEffect, useState } from "react";
import InputTask from "../inputTask/InputTask.tsx";
import {Link} from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState({});
  const [pendingTask, setPendingTask] = useState([]);

  // when loading applicatie task will be fetched
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await fetch("http://localhost:8080/tasks");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  const deleteTask = async (taskId: string) => {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE", // Specify the method to use
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setTasks((currentTasks) =>
      currentTasks.filter((task) => {
        return task._id !== taskId;
      }),
    );
  };

  const updateTask = async (taskId: string, task: string) => {
    console.log(taskId);
    const response = await fetch(
      `http://localhost:8080/tasks/update/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task }),
      },
    );

    if (!response.ok) {
      throw new Error("Network update response was not ok");
    }

    const data = await response.json();
    console.log("Task updated successfully:", data);
    await getTasks();
    setPendingTask("");
  };

  const toggleTask = async (taskId: string, state: boolean) => {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: !state }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    await getTasks();
    console.log("State updated successfully:", data);
  };

  const toggleEditing = (id) => {
    setEditing((prev) => {
      return { [id]: !prev[id] };
    });
  };

  const handleInputChange = (e: any) => {
    setPendingTask(e.target.value);
  };

  return (
    <div>
      <InputTask onTaskCreated={getTasks} />
      <div className={"task-list"}>
        {tasks.map((task: any, index) => (
          <div onClick={() => toggleEditing(task._id)} key={index} className={`task ${task.state ? "done" : ""}`}>
            {editing[task._id] ? (
              <div>
                <input
                  className={"edit-task"}
                  type={"text"}
                  onChange={handleInputChange}
                  value={pendingTask}
                />
              </div>
            ) : (
              <div className={"task-desc"}>{task.task}</div>
            )}
            <div className={"task-actions"}>
              <span onClick={() => toggleTask(task._id, task.state)}>
                {task.state ? "Uncheck" : "Check"}
              </span>
              <span>
                {editing[task._id] ? (
                  <span onClick={() => updateTask(task._id, pendingTask)}>
                    Save
                  </span>
                ) : (
                  <Link to={`/details/${task._id}`}>Edit</Link>
                )}
              </span>

              <span onClick={() => deleteTask(task._id)}>X</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
