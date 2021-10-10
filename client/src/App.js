import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        text: 'Invalid credentials',
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogInfo = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    try {
      const newBlog = await blogService.createBlog(blogInfo)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
      setMessage({
        text: `Added ${newBlog.title} by ${newBlog.author}`,
        type: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } catch (exception) {
      console.log(exception);
      setMessage({
        text: `${exception}`,
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  if(!user) {
    return (
      <div>
        <h2>Log in</h2>

        <Notification message={message}/>

        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type='text'
              value={username}
              name='Username'
              onChange={ ({ target }) => setUsername(target.value) }
            />
          </div>
          <div>
            Password:
            <input
              type='password'
              value={password}
              name='Password'
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message}/>
      <h2>blogs</h2>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <CreateBlogForm 
          title={title} 
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          handleCreateBlog={handleCreateBlog} 
        />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App