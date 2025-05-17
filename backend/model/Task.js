const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  status: { type: String, enum: ["To Do", "In Progress", "Done"], required: true },
  assignees: [String],
  assignedBy: String,
  dueDate: Date,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;