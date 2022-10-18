const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: [3, 'Username must be at least three characters!']
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    ownedBreweries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brewery'
        }
    ],
    tastedBreweries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brewery'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User