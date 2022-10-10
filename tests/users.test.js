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

    test('new user created successfully', async () => {
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
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.currentUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('user must have unique username', async () => {
        const usersAtStart = await helper.currentUsers()

        const newUser = {
            username: 'testuser',
            email: 'pikachu@thunderbolt.com',
            password: 'pikapi'
        }

        const res = await api
            .post('/api/users/registration')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(res.body.error).toContain('That username is already taken!')

        const usersAtEnd = await helper.currentUsers()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('user must have unique email', async () => {
        const usersAtStart = await helper.currentUsers()

        const newUser = {
            username: 'tokepi',
            email: 'email@email.com',
            password: 'mommyMisty'
        }

        const res = await api
            .post('/api/users/registration')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(res.body.error).toContain('An account with that email already exists!')

        const usersAtEnd = await helper.currentUsers()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})

