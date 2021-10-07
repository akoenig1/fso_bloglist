const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const users = await User.find({})
  const userId = users[0].id
  const user = await User.findById(userId)

  const blog = new Blog({
    ...req.body,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  console.log(user)
  await user.save({ validateBeforeSave: false })
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  res.status(204).json(blog)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const opts = { new: true, runValidators: true }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, opts)

  res.json(updatedBlog)
})

module.exports = blogsRouter