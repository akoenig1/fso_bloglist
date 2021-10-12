import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

test('<CreateBlogForm /> calls handleCreateBlog onSubmit with correct form data', async () => {
  const mockCreator = jest.fn()

  const component = render(
    <CreateBlogForm handleCreateBlog={mockCreator} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('.create-blog-form')

  fireEvent.change(title, {
    target: {
      value: 'Cooking Sous Viv'
    }
  })
  fireEvent.change(author, {
    target: {
      value: 'Vivian Cao'
    }
  })
  fireEvent.change(url, {
    target: {
      value: 'cookingsousviv.com'
    }
  })
  fireEvent.submit(form)

  expect(mockCreator.mock.calls).toHaveLength(1)
  expect(mockCreator.mock.calls[0][0].title).toBe('Cooking Sous Viv')
  expect(mockCreator.mock.calls[0][0].author).toBe('Vivian Cao')
  expect(mockCreator.mock.calls[0][0].url).toBe('cookingsousviv.com')
})