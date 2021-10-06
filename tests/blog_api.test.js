const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('correct number of blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'Cooking Sous Viv',
    author: 'Vivian Cao',
    url: 'http://www.cookingsousviv.com',
    likes: 1000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const authors = response.body.map(res => res.author)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toContain(
    'Vivian Cao'
  )
})

test('a new blog with no likes property specified is created with likes initialized to 0', async () => {
  const newBlog = {
    title: 'Cooking Sous Viv',
    author: 'Vivian Cao',
    url: 'http://www.cookingsousviv.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})

test('a blog with no title property will not be saved to the database', async () => {
  const newBlog = {
    author: 'Vivian Cao',
    url: 'http://www.cookingsousviv.com',
    likes: 1000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog with no url property will not be saved to the database', async () => {
  const newBlog = {
    title: 'Cooking Sous Viv',
    author: 'Vivian Cao',
    likes: 1000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})