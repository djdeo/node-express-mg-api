const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

// Connect Database
connectDB();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const ideaRouter = require('./routes/ideas');
app.use('/api/ideas', ideaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
