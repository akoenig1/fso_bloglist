import React, { useState, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const Blog = React.forwardRef(({ blog, handleLikeBlog, handleDeleteBlog }, ref) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const creator = blog.user ? blog.user.name : null

  const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
  const user = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : {}

  useImperativeHandle(ref, () => {
    return {
      blog, likes, setLikes
    }
  })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='hidden-view' style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div className='extended-view' style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
        <br/>
        {blog.url}
        <br />
        Likes {blog.likes} <button onClick={handleLikeBlog}>Like</button>
        <br />
        {creator}
        <br />
        {creator === user.name ? <button onClick={handleDeleteBlog}>Delete</button> : null}
      </div>
    </div>
  )
})

Blog.displayName = 'Blog'

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  handleDeleteBlog: propTypes.func.isRequired
}

export default Blog