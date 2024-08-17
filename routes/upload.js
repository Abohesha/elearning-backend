
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/images/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = `/uploads/images/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
