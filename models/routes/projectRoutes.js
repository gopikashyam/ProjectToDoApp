const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Todo = require('../models/todo');

// Create a new project
router.post('/', async (req, res) => {
  const { title } = req.body;
  const newProject = new Project({ title });
  await newProject.save();
  res.redirect('/projects');
});

// List all projects
router.get('/', async (req, res) => {
  const projects = await Project.find().populate('todos');
  res.render('index', { projects });
});

// View a project
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id).populate('todos');
  if (!project) {
    return res.status(404).send('Project not found');
  }
  res.render('project', { project });
});

module.exports = router;
