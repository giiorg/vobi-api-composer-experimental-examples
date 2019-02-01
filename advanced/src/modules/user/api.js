const path = require('path')
const { ApiComposer } = require('@giiorg/vobi-api-composer-experimental')

const api = new ApiComposer()

api.setResolversPath(path.resolve(__dirname, 'resolvers'))

api.createTypes({
  User: {
    firstName: 'String',
    lastName: 'String',
    email: 'String',
  },
  AccessToken: {
    accessToken: 'String'
  },
})

api.setDefaultType('User')

api.query('me', 'user.me')

api
  .mutation('signUp')
  .args({
    record: {
      email: 'String!',
      password: 'String!',
      firstName: 'String!',
      lastName: 'String!',
    }
  })
  .resolve('auth.signUp')
  .type('AccessToken')

api
  .mutation('signIn')
  .args({
    record: {
      email: 'String!',
      password: 'String!',
    }
  })
  .resolve('auth.signIn')
  .type('AccessToken')

module.exports = api
