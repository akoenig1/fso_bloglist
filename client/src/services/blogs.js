/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blogInfo) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogInfo, config)
  return response.data
}

const updateBlog = async (targetedBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${targetedBlog.id}`, targetedBlog, config)
  return response.data
}

export default { setToken, getAll, createBlog, updateBlog }