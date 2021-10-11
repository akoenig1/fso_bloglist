import React, { useState } from 'react'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const creator = blog.user ? blog.user.name : null
  
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
        Likes {blog.likes} <button>Like</button>
        <br />
        {creator}
      </div>
    </div>  
  )
}

export default Blog