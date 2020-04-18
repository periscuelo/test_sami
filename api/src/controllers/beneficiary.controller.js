const model = require('models/beneficiary.model');

const BeneficiaryController = {
  list(req, resp, next) {
    const query = {};

    if (req.query.name) {
      query.name = new RegExp(req.query.name, 'i');
    }

    Promise.all([
      model.listAsync(query),
      model.countAsync(query),
    ]).then(data => {
      resp.json({
        items: data[0],
        total: data[1],
      });
      return next();
    }).catch(next);
  },
  getById(req, resp, next) {
    const { id } = req.params;
    model.byIdAsync(id)
      .then(data => {
        resp.json(data);
        return next();
      })
      .catch(next);
  },
  create(req, resp, next) {
    model.createAsync(req.body)
      .then(data => {
        resp.contentType = 'json';
        resp.send(201, data);
        return next();
      })
      .catch(next);
  },
  update(req, resp, next) {
    const { id } = req.params;
    model.updateAsync(id, req.body)
      .then(data => {
        resp.json(data);
        return next();
      })
      .catch(next);
  },
  delete(req, resp, next) {
    const { id } = req.params;
    model.deleteAsync(id)
      .then(data => {
        resp.send(204);
        return next();
      })
      .catch(next);
  }
};

module.exports = BeneficiaryController;
