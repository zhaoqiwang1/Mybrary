const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
    console.log('successful')
})


module.exports = router
// the above code exports our router so that, in server.js, const indexRouter = require('./routes/index') knows that we are importing the routers we created here in this index.js file. 
// in server.js, the indexRouter variable will be set to equal to the 'router' variable here in this index.js file.












