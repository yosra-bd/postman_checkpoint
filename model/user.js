const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    city: {
        type: String,
    }
})

module.exports = mongoose.model('User', userSchema)