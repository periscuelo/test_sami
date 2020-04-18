const bluebird = require('bluebird');
const data = require('schemas/beneficiary.schema');
const mongoose = require('config/mongo');

const model = mongoose.model(data.Collection, data.Schema);

const beneficiaries = {
  count(query, callback) {
    model.countDocuments(query, callback);
  },
  list(query, callback) {
    model.find(query, callback);
  },
  byId(id, callback) {
    const query = { _id: mongoose.Types.ObjectId(id) };
    model.findById(query, callback);
  },
  create(data, callback) {
    model.create(data, callback);
  },
  update(id, data, callback) {
    const query = { _id: mongoose.Types.ObjectId(id) };
    model.updateOne(query, { $set: data }, { runValidators: true }, callback);
  },
  delete(id, callback) {
    const query = { _id: mongoose.Types.ObjectId(id) };
    model.deleteOne(query, callback);
  }
};

module.exports = bluebird.promisifyAll(beneficiaries);
