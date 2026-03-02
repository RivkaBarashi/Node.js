require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/user');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware לניתוח JSON
app.use(express.json());

// Routes
app.use('/users', usersRoutes);

// Middleware לטיפול בשגיאות (תמיד אחרי ה־routes)
app.use(errorHandler);

// הגדרת משתני סביבה
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// חיבור ל־MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});