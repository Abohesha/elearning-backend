// routes/teachers.js
const express = require('express');
const Teacher = require('../models/Teacher');
const Comment = require('../models/comment');
const router = express.Router();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('subjects');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new teacher
router.post('/', async (req, res) => {
  const { name, description, photo, rating, subjects } = req.body;

  const teacher = new Teacher({
    name,
    description,
    photo,
    rating,
    subjects,
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('subjects');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update a teacher
router.patch('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const { name, description, photo, rating, subjects } = req.body;
    if (name) teacher.name = name;
    if (description) teacher.description = description;
    if (photo) teacher.photo = photo;
    if (rating) teacher.rating = rating;
    if (subjects) teacher.subjects = subjects;

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    await teacher.deleteOne();
    res.json({ message: 'Teacher removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get comments for a specific teacher
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ teacher: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/:id/comments', async (req, res) => {
  try {
      const { text, rating } = req.body;
      const newComment = new Comment({
          teacher: req.params.id,
          text,
          rating,
      });

      const savedComment = await newComment.save();

      // Calculate the new average rating
      const teacher = await Teacher.findById(req.params.id);
      const comments = await Comment.find({ teacher: req.params.id });

      const averageRating = comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length;

      // Update the teacher's rating
      teacher.rating = averageRating;
      await teacher.save();

      res.json(savedComment);
  } catch (error) {
      res.status(500).send('Server error');
  }
});




module.exports = router;
