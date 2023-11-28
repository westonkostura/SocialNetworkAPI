const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const indexRoutes = require('./index');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socialnetwork', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Middleware for body-parser
app.use(bodyParser.json());

// Use Routes
app.use('/', indexRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));