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

module.exports = router;