const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const User = require('../models/users')
const helper = require('./test_helper')

describe('user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({
            username: 'testuser',
            email: 'email@email.com',
            passwordHash
        })

        await user.save()
    })

    test('create a new user', async () => {
        const usersAtStart = await helper.currentUsers()

        const newUser = {
            username: 'new user',
            email: 'special@email.com',
            password: 'psyduck'
        }

        await api
            .post('/api/users/registration')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /applicaiont\/json/)

        const usersAtEnd = await helper.currentUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})

