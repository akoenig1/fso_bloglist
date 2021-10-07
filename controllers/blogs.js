const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const user = req.user

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

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if(blog.user.toString() !== user.id.toString()) {
    return res.status(403).json({ error: 'Blog may only be deleted by its creator' })
  }

  await Blog.findByIdAndDelete(req.params.id)
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