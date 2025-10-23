const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create new task
router.post("/", async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title });
  await newTask.save();
  res.json(newTask);
});

// Update task
router.put("/:id", async (req, res) => {
  const { title, completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, completed },
    { new: true }
  );
  res.json(updatedTask);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
