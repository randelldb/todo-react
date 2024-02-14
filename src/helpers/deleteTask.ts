export const deleteTask = async (taskId: string) => {
  const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
    method: "DELETE", // Specify the method to use
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // setTasks((currentTasks) =>
  //     currentTasks.filter((task) => {
  //         return task._id !== taskId;
  //     }),
  // );
};
