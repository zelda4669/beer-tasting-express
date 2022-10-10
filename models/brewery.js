const mongoose = require('mongoose')

const brewerySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'An entry for that brewery already exists.'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tasted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

brewerySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Brewery', brewerySchema)