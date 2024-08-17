const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const teachersRoutes = require('./routes/teachers');
const subjectsRoutes = require('./routes/subjects');
const carouselItemsRoutes = require('./routes/carouselItems');
const uploadRoutes = require('./routes/upload');

const app = express();

connectDB();

app.use(express.json());
app.use(cors()); 

app.use('/uploads', express.static('uploads'));

app.use('/api/upload', uploadRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/carousel-items', carouselItemsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
