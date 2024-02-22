export const updateTask = async (taskId: string | undefined, task: { task: string; description: string }) => {
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

  return data
};
