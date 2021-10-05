const _ = require('lodash')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length > 0) {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0)
  } else {
    return 0
  }
}

const favoriteBlog = (blogs) => {
  if(blogs.length > 0) {
    let favorite = { likes: 0 }
    blogs.forEach(blog => {
      if(blog.likes > favorite.likes) favorite = blog
    })
    return (
      {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
      }
    )
  } else {
    return 'No blogs'
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length > 0) {
    const authors = _.map(blogs, 'author')
    const mostCommonAuthor = _.chain(authors).countBy().toPairs().max(_.last).value()
    return (
      {
        author: mostCommonAuthor[0],
        blogs: mostCommonAuthor[1]
      }
    )
  } else {
    return 'No blogs'
  }
}

const mostLikes = (blogs) => {
  if(blogs.length > 0) {
    return
  } else {
    return 'No blogs'
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}