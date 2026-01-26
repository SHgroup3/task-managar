function TaskItem({ task, tasks, setTasks, onUpdate, onDelete }) {
  return (
    <li className="border rounded-lg p-4 grid grid-cols-12 gap-3 bg-gray-50">
      <input
        value={task.title}
        onChange={(e) =>
          setTasks(tasks.map(t =>
            t._id === task._id ? { ...t, title: e.target.value } : t
          ))
        }
        className="col-span-2 border px-2 py-1 rounded-md"
      />

      <input
        value={task.description}
        onChange={(e) =>
          setTasks(tasks.map(t =>
            t._id === task._id ? { ...t, description: e.target.value } : t
          ))
        }
        className="col-span-4 border px-2 py-1 rounded-md"
      />

      <select
        value={task.status}
        onChange={(e) =>
          setTasks(tasks.map(t =>
            t._id === task._id ? { ...t, status: e.target.value } : t
          ))
        }
        className="col-span-3 border p-1 rounded-md"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In-progress</option>
        <option value="done">Done</option>
      </select>

      <div className="col-span-2 flex gap-2">
        <button
          onClick={() => onUpdate(task)}
          className="bg-green-500 text-white px-3 py-1 rounded-md"
        >
          Update
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
