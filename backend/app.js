const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);

mongoose.connect("mongodb://localhost:27017/taskdb")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
