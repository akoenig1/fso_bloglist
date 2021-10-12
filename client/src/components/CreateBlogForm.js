// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import propTypes from 'prop-types'

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  // useImperativeHandle(ref, () => {
  //   return {
  //     clearForm
  //   }
  // })

  return(
    <form className='create-blog-form' onSubmit={addBlog}>
      <div>
        Title:
        <input
          id='title'
          type='text'
          value={title}
          name='title'
          onChange={ ({ target }) => setTitle(target.value) }
        />
      </div>
      <div>
        Author:
        <input
          id='author'
          type='text'
          value={author}
          name='author'
          onChange={ ({ target }) => setAuthor(target.value) }
        />
      </div>
      <div>
        URL:
        <input
          id='url'
          type='text'
          value={url}
          name='url'
          onChange={ ({ target }) => setUrl(target.value) }
        />
      </div>
      <button type='submit'>Add Blog</button>
    </form>
  )
}

CreateBlogForm.displayName = 'Create Blog Form'

CreateBlogForm.propTypes = {
  handleCreateBlog: propTypes.func.isRequired
}

export default CreateBlogForm