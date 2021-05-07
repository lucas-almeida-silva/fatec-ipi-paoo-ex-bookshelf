const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { mongoDb } = require('./config/database.js');
const booksRouter = require('./routes/books.routes');

mongoose.connect(
  `mongodb+srv://${mongoDb.user}:${mongoDb.password}@${mongoDb.cluster}.mongodb.net/${mongoDb.database}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connection to MongoDB successful'))
.catch((ex) => console.log('Connection to MongoDB failed: ' + ex));

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/books', booksRouter);


module.exports = app;
