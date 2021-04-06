const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'http://w-city.herokuapp.com';

module.exports = baseUrl;
