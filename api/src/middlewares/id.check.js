const idCheck = (req, resp, next) => {
  if (req.params.id.length !== 24) {
    const err = { err: 'invalid mongo id' };
    resp.send(422, err);
  }
  return next();
};

module.exports = idCheck;
