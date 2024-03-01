const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const authRouter = require('./routes/auth');
const ideaRouter = require('./routes/ideas');
const uploadRouter = require('./routes/upload');
const userRouter = require('./routes/users');


// Connect Database
connectDB();
// set public folder
app.use(express.static('public'));

// set security http headers
app.use(helmet());

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

// sanitize data
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
  whitelist: [] // add what you want to ignore
}));

// enable cors

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRouter);
app.use('/api/ideas', ideaRouter);
app.use('/upload', uploadRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
