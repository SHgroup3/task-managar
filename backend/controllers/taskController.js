const Task = require("../models/taskmodel");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const task = new Task({ title, description });
    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks
exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { isDeleted: false };
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update Task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task soft deleted successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDeletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isDeleted: true });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



