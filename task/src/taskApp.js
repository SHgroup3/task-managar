import { useEffect, useState } from "react";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks/list-tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/tasks/create-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setStatus("pending");

      fetchTasks();
    } else {
      alert("Task not added");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="text-center pt-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <h2 className="text-2xl font-bold mb-4 text-indigo-600">Create Task</h2>

  <form onSubmit={addTask} className="space-y-4">
    <input
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />

    <input
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />

    <select
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="pending">Pending</option>
      <option value="success">Success</option>
      <option value="failed">Failed</option>
    </select>

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-md hover:bg-indigo-700 transition"
    >
      Add Task
    </button>
  </form>

  <hr className="my-6 border-gray-300" />

  <h2 className="text-xl font-semibold mb-4 text-indigo-500">Task List</h2>

  <ul className="space-y-3">
    {tasks.map((task) => (
      <li
        key={task._id}
        className="p-3 bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center"
      >
        <div>
          <b className="text-lg">{task.title}</b> – {task.description}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            task.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : task.status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {task.status}
        </span>
      </li>
    ))}
  </ul>
</div>
  )
}

export default TaskApp;
