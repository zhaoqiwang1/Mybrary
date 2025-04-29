const express = require('express')
const router = express.Router()
const Author = require('../models/author') // give us the access to the author.js model. 

// All Authors Route
router.get('/', (req, res) => {
    res.render('authors/index')
    console.log('successful')
})

// New Author Route: this route is just for displaying the form, the route below is actually creating the author.
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author ()})
})
//Create Author Route: this one creates new authors.
router.post('/', (req, res) => {
    res.send(req.body.name)
})

module.exports = router

/*
Each one of our routes should be inside of its own folder. For example routes for authors should be in
side of teh authors folder (in views).
The main index route is an exception.
*/