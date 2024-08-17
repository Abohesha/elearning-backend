// routes/subjects.js
const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new subject
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  const subject = new Subject({
    name,
    description,
  });

  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a subject
router.patch('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    const { name, description } = req.body;
    if (name) subject.name = name;
    if (description) subject.description = description;

    const updatedSubject = await subject.save();
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a subject
router.delete('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    await subject.deleteOne();
    res.json({ message: 'Subject removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
