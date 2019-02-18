module.exports = {
  client: {
    service: {
      includes: ['src/queries/*.ts'],
      headers: {},
      name: 'homebar graphine',
      url: 'http://localhost:5000/graphql',
      // optional headers
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};