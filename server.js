const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

// Connect Database
connectDB();
// set public folder
app.use(express.static('public'));
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
