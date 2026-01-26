const express = require("express");
const Task = require("../taskmodel");

const router = express.Router();

router.post("/create-tasks", async (req, res) => {
  const { title, description, status } = req.body;


  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
  }

  // if (status && !["pending", "failed", "success"].includes(status)) {
  //   return res.status(400).json({ message: "Invalid status value" });
  // }

  const task = new Task({ title, description});
  await task.save();

  res.status(201).json({ message: "Task created", task });
});

router.get("/list-tasks", async (req, res) => {
   const { status } = req.query;

    const filter = status ? { status } : {};
    const tasks = await Task.find(filter);
    
  res.json(tasks);
});

router.patch("/update-task/:id", async (req, res) => {
   console.log("ID:", req.params.id);
  console.log("BODY:", req.body);
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      },
      {
        new: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-task/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});




module.exports = router;