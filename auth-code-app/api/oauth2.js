const axios = require('axios');

const oauth2 = axios.create({
  baseURL: 'http://localhost:9763/oauth2',
  //baseURL: 'https://jsonplaceholder.typicode.com',
});

module.exports = oauth2;
