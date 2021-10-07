const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if(err.name === 'CastError') {
    return res.status(400).send({ err: 'Malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (req, res, next) => {
  // eslint-disable-next-line no-undef
  const decodedToken = req.token ? jwt.verify(req.token, process.env.JWT_SECRET) : null
  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  req.user = await User.findById(decodedToken.id)

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}