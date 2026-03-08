require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

const errorHandler = require('./middlewares/errorHandler');
const { authenticate } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.use('/products', authenticate, productsRoutes);
app.use('/categories', authenticate, categoriesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });