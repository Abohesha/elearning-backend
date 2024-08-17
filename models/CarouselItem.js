const mongoose = require('mongoose');

const carouselItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const CarouselItem = mongoose.model('CarouselItem', carouselItemSchema);

module.exports = CarouselItem;
