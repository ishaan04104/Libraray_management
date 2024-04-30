const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})

router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(username =="21BIT" && password=="password"){
    req.session.user = {
      id: username,
      username: username,
      password: password
    }
    res.redirect("/")
  }else{
    res.redirect("/login")
  }

  // Check if the username and password are valid
  // If they are, redirect the user to the home page
  // If they're not, render the login page again with an error message
});


module.exports = router

