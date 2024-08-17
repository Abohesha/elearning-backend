const express = require('express');
const CarouselItem = require('../models/CarouselItem');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const items = await CarouselItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, description, imageUrl } = req.body;

  const carouselItem = new CarouselItem({
    title,
    description,
    imageUrl,
  });

  try {
    const newItem = await carouselItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const item = await CarouselItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Carousel item not found' });

    const { title, description, imageUrl } = req.body;
    if (title) item.title = title;
    if (description) item.description = description;
    if (imageUrl) item.imageUrl = imageUrl;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a carousel item
router.delete('/:id', async (req, res) => {
  try {
    const item = await CarouselItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Carousel item not found' });

    await item.deleteOne();
    res.json({ message: 'Carousel item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
