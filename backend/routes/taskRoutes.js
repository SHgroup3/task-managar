const express = require("express");
const Task = require("../taskmodel");

const router = express.Router();

router.post("/create-tasks", async (req, res) => {
  const { title, description, status } = req.body;


  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
  }

  if (status && !["pending", "failed", "success"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const task = new Task({ title, description, status });
  await task.save();

  res.status(201).json({ message: "Task created", task });
});

router.get("/list-tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const updateTask = async (task) => {
  try {
    const res = await fetch(`http://localhost:5000/tasks/update-task/${task._id}`, {
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

    if (res.ok) {
      alert("Task updated successfully!");
      fetchTasks(); 
    } else {

      const errorData = await res.json();
      alert(`Update failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (err) {
    // Agar network hi na ho ya fetch crash ho jaye
    console.error("Update Error:", err);
    alert("Network error! Please check your connection.");
  }
};
router.delete("/delete-task/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});




module.exports = router;