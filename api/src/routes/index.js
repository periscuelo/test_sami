const auth = require('./auth');
const beneficiaries = require('./beneficiaries');

const router = server => {
  server.get('/', (req, res, next) => {
    res.send('API Test Sami');
    return next();
  });

  auth(server);
  beneficiaries(server);
};

module.exports = router;
