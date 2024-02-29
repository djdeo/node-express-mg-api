const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
// Connect Database
connectDB();
// set public folder
app.use(express.static('public'));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
  message: 'Too many requests from this IP, please try again after an hour!'
});

// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const ideaRouter = require('./routes/ideas');
app.use('/api/ideas', ideaRouter);

const uploadRouter = require('./routes/upload');
app.use('/upload', uploadRouter);

const userRouter = require('./routes/users');
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
