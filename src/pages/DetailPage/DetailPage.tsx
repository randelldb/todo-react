import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/header/Header.tsx";
import { updateTask } from "../../helpers/updateTask.ts";
import * as events from "events";

export const DetailPage = () => {
  const params = useParams<{ taskId: string }>();
  const [task, setTask] = useState({
    task: '',
    state: '',
    description: ''
  });

  // Fetch task data when the component mounts or params.taskId changes
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `http://localhost:8080/task/${params.taskId}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTask(prevState => ({
        ...prevState,
        task:data.task,
        state:data.state,
        description: data.description
      }))
    };
    fetchTask();
  }, [params.taskId]); // Dependency array includes params.taskId

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setTask(prevState => ({
      ...prevState, [name]:value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(params.taskId, {task: task.task, description:task.description});
  };

  return (
    <div className={"detail-page"}>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task</span>
          <input
            type="text"
            name="task"
            value={task.task}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
              name="description"
              value={task.description}
              onChange={handleInputChange}
          />
        </label>
        <div className={"align-right"}>
          <button className={"btn no-button-radius-right"} type="submit">
            Save
          </button>
          <button className={"btn no-button-radius-left alert"}>
            Delete
          </button>
        </div>
      </form>
      <Link to={"/"}>Home</Link>
    </div>
  );
};
