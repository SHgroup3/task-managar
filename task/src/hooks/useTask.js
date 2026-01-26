import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTaskApi,
  deleteTaskApi,
} from "../services/taskApi";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async (status = "all") => {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks(status);
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    }
    setLoading(false);
  };

  const addTask = async (taskData) => {
    await createTask(taskData);
    fetchTasks();
  };

  const updateTask = async (task) => {
    await updateTaskApi(task);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteTaskApi(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    setTasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
