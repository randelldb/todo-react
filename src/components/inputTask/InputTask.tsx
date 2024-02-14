import { useState } from "react";
import { useFetchTask } from "../../hooks/useFetchTask.tsx";

const InputTask = ({ onTaskCreated }) => {
  const [taskInput, setTaskInput] = useState("");
  const createTask = async (task: string) => {
    const response = await fetch("http://localhost:8080/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    });

    console.log(response.body);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // await fetchData();
    console.log("Task created successfully:", data);

    onTaskCreated();
  };

  const handleInputChange = (e: any) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (taskInput) {
      // only fire function if task is not empty
      createTask(taskInput);
    }
    setTaskInput(""); // reset
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={"add-task"}>
        <input
          placeholder={"Task Away..."}
          type="text"
          name="task"
          onChange={handleInputChange}
          id={"task"}
          value={taskInput}
        />
        <button className={"addBtn"} type={"submit"}>
          Add
        </button>
      </label>
    </form>
  );
};

export default InputTask;
