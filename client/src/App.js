import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
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
    setUser(null)
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
      <h2>blogs</h2>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App