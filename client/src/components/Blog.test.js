import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('initially renders only title and author', () => {
  const blog = {
    title: 'Cooking Sous Viv',
    author: 'Vivian Cao',
    url: 'cookingsousviv.com',
    likes: 0,
    user: null
  }

  const component = render(
    <Blog blog={blog} handleDeleteBlog={() => null} />
  )

  expect(component.container.querySelector('hidden-view')).toBeDefined()
  expect(component.container.querySelector('expanded-view')).toBeNull()
})

test('clicking the view button displays extended view', () => {
  const blog = {
    title: 'Cooking Sous Viv',
    author: 'Vivian Cao',
    url: 'cookingsousviv.com',
    likes: 0,
    user: null
  }

  const component = render(
    <Blog blog={blog} handleDeleteBlog={() => null} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container.querySelector('hidden-view')).toBeNull()
  expect(component.container.querySelector('expanded-view')).toBeDefined()
})

test('clicking the like button twice fires the like event handler twice', () => {
  const blog = {
    title: 'Cooking Sous Viv',
    author: 'Vivian Cao',
    url: 'cookingsousviv.com',
    likes: 0,
    user: null
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeBlog={mockHandler} handleDeleteBlog={() => null} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})