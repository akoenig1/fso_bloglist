const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('can create a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'bobama44',
      name: 'Barack Obama',
      password: 'barry0'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('can get all users info returned as json', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})