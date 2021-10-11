import React, { useState, useImperativeHandle } from 'react'
import blogService from '../services/blogs' 
import propTypes from 'prop-types'

const Blog = React.forwardRef(({blog, handleDeleteBlog}, ref) => {
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
  const user = JSON.parse(loggedInUserJSON)

  useImperativeHandle(ref, () => {
    return {
      blog
    }
  })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeBlog = async (event) => {
    event.preventDefault()
    blog.likes += 1

    try {
      await blogService.updateBlog(blog)
      setLikes(likes + 1)
    } catch (exception) {
      console.log(exception);
    }
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
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

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  handleDeleteBlog: propTypes.func.isRequired
}

export default Blog