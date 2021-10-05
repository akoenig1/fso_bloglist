const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  if(blogs) {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0)
  } else {
    return 0
  }
}

module.exports = {
  dummy,
  totalLikes
}