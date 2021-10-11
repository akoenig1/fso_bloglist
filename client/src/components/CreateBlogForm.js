// eslint-disable-next-line no-unused-vars
import React, { useState, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const CreateBlogForm = React.forwardRef(({ handleCreateBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(ref, () => {
    return {
      clearForm
    }
  })

  return(
    <form onSubmit={handleCreateBlog}>
      <div>
        Title:
        <input
          type='text'
          value={title}
          name='title'
          onChange={ ({ target }) => setTitle(target.value) }
        />
      </div>
      <div>
        Author:
        <input
          type='text'
          value={author}
          name='author'
          onChange={ ({ target }) => setAuthor(target.value) }
        />
      </div>
      <div>
        URL:
        <input
          type='text'
          value={url}
          name='url'
          onChange={ ({ target }) => setUrl(target.value) }
        />
      </div>
      <button type='submit'>Add Blog</button>
    </form>
  )
})

CreateBlogForm.displayName = 'Create Blog Form'

CreateBlogForm.propTypes = {
  handleCreateBlog: propTypes.func.isRequired
}

export default CreateBlogForm