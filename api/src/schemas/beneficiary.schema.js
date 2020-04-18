const mongoose = require('config/mongo');

const Collection = 'beneficiaries';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  cpf: {
    type: Number,
    unique: true,
    required: true
  },
  rg: {
    type: Number,
    required: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  plan: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium'],
    required: true
  },
  dependents: {
    type: Number,
    required: false
  }
});

module.exports = { Collection , Schema };
