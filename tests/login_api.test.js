const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('an existing user can login', async () => {
  const userCreds = {
    username: 'root',
    password: 'secret'
  }

  const response = await api.post('/api/login').send(userCreds).expect(200)
  expect(response.body.username).toBe('root')
})

afterAll(() => {
  mongoose.connection.close()
})