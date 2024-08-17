// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    photo: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    subjects: 
      {
        type: String,
      },
   
  });
  
  const Teacher = mongoose.model('Teacher', teacherSchema);
  module.exports = Teacher;
  