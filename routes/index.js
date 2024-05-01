const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// Get all books
router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})

// Render create page
router.get('/create', (req, res) => {
  res.render('create');
});

// Render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Render 404 page
router.get('/404', (req, res) => {
  res.render('404');
});

// Render account 404 page
router.get('/404acc', (req, res) => {
  res.render('404acc');
});

// Users object to store username-password pairs
const users = {}

// Handle login POST request
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(username in users && users[username] == password) {
    console.log("Login successful");
    req.session.user = {
      id: username,
      username: username,
      password: password
    }
    res.redirect("/")
  } else {
    res.redirect("/404")
  }
})

// Handle create POST request
router.post('/create', (req, res) => {
  const { username, password } = req.body;

  if(username in users) {
    res.redirect("/404acc")
  } else {
    users[username] = password
    console.log(users)
    res.redirect("/login")
  }
})



module.exports = router
