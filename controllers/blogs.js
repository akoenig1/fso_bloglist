const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)
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