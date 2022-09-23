const mongoose = require('mongoose')

const brewerySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'That name is already in your phonebook!'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tasted: {
        type: Boolean,
        default: false
    }
})

brewerySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Brewery', brewerySchema)