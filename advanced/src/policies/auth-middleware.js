const config = require('../config')
const JwtService = require('../services/jwt-service')
const { extractToken } = require('../utils')
const UserModel = require('app/modules/user/user')

const jwt = new JwtService(config.jwt)

const authMiddleware = async (req, res, next) => {
  const token = extractToken(req)
  console.log(token)
  if (!token) {
    return next()
  }

  let payload
  try {
    payload = jwt.verify(token)
  } catch (e) {
    return next()
  }

  try {
    const user = await UserModel.findById(payload.id)
    if (!user) {
      return next()
    }

    req.user = user

    next()
  } catch (err) {
    res.serverError(err)
  }
}

module.exports = {
  authMiddleware
}
