const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Todo = require('../models/todo');

// Add a todo
router.post('/:projectId', async (req, res) => {
  const { description } = req.body;
  const newTodo = new Todo({
    description
  });
  await newTodo.save();

  const project = await Project.findById(req.params.projectId);
  project.todos.push(newTodo);
  await project.save();

  res.redirect(`/projects/${req.params.projectId}`);
});

// Update a todo
router.post('/:projectId/todos/:todoId/update', async (req, res) => {
  const { description, status } = req.body;
  await Todo.findByIdAndUpdate(req.params.todoId, {
    description,
    status,
    updatedDate: new Date()
  });
  res.redirect(`/projects/${req.params.projectId}`);
});

// Delete a todo
router.post('/:projectId/todos/:todoId/delete', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.todoId);
  const project = await Project.findById(req.params.projectId);
  project.todos.pull(req.params.todoId);
  await project.save();
  res.redirect(`/projects/${req.params.projectId}`);
});

module.exports = router;
