const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    breweries: [
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