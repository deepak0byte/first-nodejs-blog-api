const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Import models
const Post = require('./src/models/post');

// Define application
const app = express()

// Define DB Connection
const db = mongoose.connect('mongodb://localhost:27017/first-node-api-db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  // handle the request for root route
  res.send({
    "FirstName": "Deepak",
    "LastName": "Kumar",
    "Age": 24
  })
})

// Operations: Create, Read, Update, Delete (CRUD)
app.post('/posts', function (req, res) {
  // Get values from request payload
  const FirstName = req.body.FirstName
  const LastName = req.body.LastName
  const Age = req.body.Age

  // Assign values to Post model
  var post = new Post();
  post.FirstName = FirstName
  post.LastName = LastName
  post.Age = Age

  // Save the post
  post.save(function (error, savedPost) {
    if (error) {
      // send error response
      res.status(500).send({ error: 'Unable to save Post ' })
    } else {
      // send success response
      res.status(200).send(savedPost)
    }
  })
});

// Get list of all posts
app.get('/posts', function (req, res) {
  Post.find({}, function (error, posts) {
    if (error) {
      // send error response
      res.status(422).send({ error: 'Unable to fetch posts ' })
    } else {
      // send success response
      res.status(200).send(posts)
    }
  })
})

app.listen(3001, function () {
  console.log('Server is running at port 3001....')
})