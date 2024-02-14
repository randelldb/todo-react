export const updateTask = async (taskId: string , task: {task:string, state:boolean, description:string}) => {
  console.log(task);
  const response = await fetch(`http://localhost:8080/tasks/update/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Network update response was not ok");
  }

  const data = await response.json();
  console.log("Task updated successfully:", data);
  // await fetchData();
};
