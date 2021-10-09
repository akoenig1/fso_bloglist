// eslint-disable-next-line no-unused-vars
import react, { useState } from 'react'

const CreateBlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreateBlog }) => {

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
}

export default CreateBlogForm