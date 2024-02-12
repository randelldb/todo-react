import { useState } from "react";

const InputTask = ({ onTaskCreated }: any) => {
  const [task, setTask] = useState("");
  const createTask = async (task: string) => {
    const response = await fetch("http://localhost:8080/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    onTaskCreated();
    console.log("Task created successfully:", data);
  };

  const handleInputChange = (e: any) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task) {
      // only fire function if task is not empty
      createTask(task);
    }
    setTask(""); // reset
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
          value={task}
        />
        <button type={"submit"}>Add</button>
      </label>
    </form>
  );
};

export default InputTask;
