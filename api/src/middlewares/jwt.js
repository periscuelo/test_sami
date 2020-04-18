const jwt = require('jwt-simple');

const SECRET = 'api-test-sami';

const jwtMid = {
  auth(req, resp, next) {
    const { user, pass } = req.body;
    if (user === 'adm' && pass === 'adm') {
      const payload = {
        expires_at: (Date.now() + 24 * 60 * 60 * 1000),
        user,
        api: 'Beneficiaries Sami',
      };
      const token = jwt.encode(payload, SECRET);

      resp.json({ token });
      return next();
    }

    const err = { err: 'Não Permitido!' };
    resp.send(401, err);
    return next();
  },
  verify(req, resp, next) {
    const token = req.headers['x-jwt'] || req.query.token;
    try {
      const decoded = jwt.decode(token, SECRET, true);

      if (decoded.expires_at < new Date()) {
        throw new Error('Token Expirado!');
      }

      req.authorization = decoded;
    } catch (e) {
      resp.send(401, e);
    }
    return next();
  },
};

module.exports = jwtMid;
