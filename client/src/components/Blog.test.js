import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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