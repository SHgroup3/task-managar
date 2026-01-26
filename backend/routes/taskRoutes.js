const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/create-tasks", createTask);      
router.get("/list-tasks", getTasks);           
router.patch("/update-task/:id", updateTask);   
router.delete("/delete-task/:id", deleteTask); 

module.exports = router;