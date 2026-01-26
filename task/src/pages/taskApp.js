import { useState } from "react";
import { useTasks } from "../hooks/useTask";
import TaskItem from "../components/taskItems";

function TaskApp() {
  const {
    tasks,
    setTasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <div className="text-center pt-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8 ">
      {/* CREATE TASK */}
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="w-full p-3 text-left border rounded-md bg-gray-50">
          Pending
        </div>

        <button className="w-full bg-indigo-600 text-white p-3 rounded-md">
          Add Task
        </button>
      </form>

      <hr className="my-6" />

      {/* FILTERS */}
      <div className="flex gap-3 mb-5 justify-center">
        <button onClick={() => fetchTasks("all")}
          className="px-4 py-1 rounded-full text-sm bg-gray-200 hover:bg-gray-300"
          >All</button>
        <button onClick={() => fetchTasks("pending")}
          className="px-4 py-1 rounded-full text-sm bg-yellow-200 hover:bg-yellow-300"
          >Pending</button>
        <button onClick={() => fetchTasks("in-progress")}
          className="px-4 py-1 rounded-full text-sm bg-blue-200 hover:bg-blue-300">
            In-Progress</button>
        <button onClick={() => fetchTasks("done")}
          className="px-4 py-1 rounded-full text-sm bg-green-200 hover:bg-green-300">
            Done</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* TASK LIST */}
      <ul className="space-y-3">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;
