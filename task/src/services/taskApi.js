const BASE_URL = "http://localhost:5000/tasks";

export const createTask = async (data) => {
  return fetch(`${BASE_URL}/create-tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const getTasks = async (status = "all") => {
  let url = `${BASE_URL}/list-tasks`;
  if (status !== "all") url += `?status=${status}`;

  const res = await fetch(url);
  return res.json();
};

export const updateTaskApi = async (task) => {
  return fetch(`${BASE_URL}/update-task/${task._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const deleteTaskApi = async (id) => {
  return fetch(`${BASE_URL}/delete-task/${id}`, {
    method: "DELETE",
  });
};
