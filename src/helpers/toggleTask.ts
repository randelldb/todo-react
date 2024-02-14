export const toggleTask = async (taskId: string, state: boolean) => {
  console.log(state)
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
  console.log("State updated successfully:", data);
};
