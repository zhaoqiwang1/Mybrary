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
router.post('/', async (req, res) => {  // <-- 'async' added here
    const author = new Author({
        name: req.body.name
    })
    try {
        // Saving the author and awaiting the result
        const newAuthor = await author.save();
        // everything in Mongoose and MongoDB is done asynchronously so we need to use
        // await in order to wait for that asynchronous call to be completed.

        // Redirecting to the authors page (or wherever you want)
        res.redirect('authors');
    } catch (err) {
        // Handling errors if any occur during the save
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        });
    }
    // author.save((err, newAuthor) => {
    //     if (err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error Creating Author'
    //         })
    //     } else {
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect('authors')
    //     }
    // })
    // res.send(req.body.name)
})

module.exports = router

/*
Each one of our routes should be inside of its own folder. For example routes for authors should be in
side of teh authors folder (in views).
The main index route is an exception.
*/