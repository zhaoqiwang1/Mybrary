const mongoose = require('mongoose')

/*
In MongoDB or SQLlibraries, a schema is essentially the same thing as a table
and in normal sequel database.
*/

// below, inside of new mongoose.schema({}) we are going to define the different columns of our 
// schema, and in this case, it is essentially a JSON object.
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// below, 'Author' is essentially the name of our table inside of our database.
// and we pass it with the schema, which defines that table, which in our case is our author schema.
module.exports = mongoose.model('Author', authorSchema)