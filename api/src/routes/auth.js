const jwt = require('middlewares/jwt');

const auth = server => {
  server.post('/auth', jwt.auth);
};

module.exports = auth;
