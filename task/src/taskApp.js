import { useEffect, useState } from "react";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


    // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/tasks/create-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setStatus("pending"); // agar response ok ho tu ya phir sa epmty ho jai nxt task ka liya
      fetchTasks();  //page refresh kiya bina new task show ho jai 
    } else {
      alert("Task not added");
    }
  };

  // FETCH TASKS
  const fetchTasks = async (status = "all") => {
  setLoading(true);
  setError("");

  try {
    let url = "http://localhost:5000/tasks/list-tasks";

    if (status && status !== "all") {
      url += `?status=${status}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setTasks(data);
  } catch (err) {
    setError("Failed to load tasks");
  }

  setLoading(false);
};



const updateTask = async (task) => {
  await fetch(`http://localhost:5000/tasks/update-task/${task._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      status: task.status,
    }),
  });

  fetchTasks();
};

  // DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/delete-task/${id}`, {
      method: "DELETE",
    });

    fetchTasks(); // list refresh
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="text-center pt-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
  <h2 className="text-2xl font-bold mb-4 text-indigo-600">Create Task</h2>
  <form onSubmit={addTask} className="space-y-4">
    <input
      className="w-full p-3 border rounded-md"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />

    <input
      className="w-full p-3 border rounded-md"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />
<div className="w-full p-3 text-left border rounded-md bg-gray-50 text-gray-700">
  Pending
</div>

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white p-3 rounded-md"
    >
      Add Task
    </button>
  </form>

  <hr className="my-6" />

  <h2 className="text-xl font-semibold mb-4">Task List</h2>

  {loading && <p>Loading...</p>}
  {error && <p className="text-red-500">{error}</p>}

  {/* TASK LIST */}
  <div className="flex items-center gap-3 mb-5">
  <span className="text-sm font-medium text-gray-600">
    Filter by status:
  </span>

  <button
    onClick={() => fetchTasks("all")}
    className="px-4 py-1 rounded-full text-sm bg-gray-200 hover:bg-gray-300"
  >
    All
  </button>

  <button
    onClick={() => fetchTasks("pending")}
    className="px-4 py-1 rounded-full text-sm bg-yellow-200 hover:bg-yellow-300"
  >
    Pending
  </button>

  <button
    onClick={() => fetchTasks("in-progress")}
    className="px-4 py-1 rounded-full text-sm bg-blue-200 hover:bg-blue-300"
  >
    In-Progress
  </button>

  <button
    onClick={() => fetchTasks("done")}
    className="px-4 py-1 rounded-full text-sm bg-green-200 hover:bg-green-300"
  >
    Done
  </button>
</div>

  <ul className="space-y-3">
    {tasks.map((task) => (
      <li
        key={task._id}
        className="border rounded-lg p-4 grid grid-cols-12 gap-3 items-center bg-gray-50"
      >
        {/* TITLE */}
        <input
          value={task.title}
          onChange={(e) =>
            setTasks(tasks.map(t =>
              t._id === task._id ? { ...t, title: e.target.value } : t
            ))
          }
          className="col-span-3 border px-2 py-1 rounded-md"
        />

        {/* DESCRIPTION */}
        <input
          value={task.description}
          onChange={(e) =>
            setTasks(tasks.map(t =>
              t._id === task._id ? { ...t, description: e.target.value } : t
            ))
          }
          className="col-span-4 border px-2 py-1 rounded-md"
        />

        {/* STATUS */}
        <select
          value={task.status}
          onChange={(e) =>
            setTasks(tasks.map(t =>
              t._id === task._id ? { ...t, status: e.target.value } : t
            ))
          }
          className="col-span-3 border p-1 rounded-md text-sm mr-4"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="done">Done</option>
        </select>

        {/* BUTTONS */}
        <div className="col-span-3 flex justify-center gap-2">
          <button
            onClick={() => updateTask(task)}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            Update
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

export default TaskApp;
