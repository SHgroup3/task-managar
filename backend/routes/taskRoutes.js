const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getDeletedTasks
} = require("../controllers/taskController");

router.post("/create-tasks", createTask);      
router.get("/list-tasks", getTasks);           
router.patch("/update-task/:id", updateTask);   
router.delete("/delete-task/:id", deleteTask); 
router.get('/deleted-tasks', getDeletedTasks);

module.exports = router;