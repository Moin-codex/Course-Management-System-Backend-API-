const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Course Management System API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);

app.use(errorMiddleware);

module.exports = app;