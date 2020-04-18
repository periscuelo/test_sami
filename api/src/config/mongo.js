const env = process.env.NODE_ENV || 'dev';
const config = {
  dev: {
    mongo: { uri: 'mongodb://localhost:27017/sami' },
  },
  test: {
    mongo: { uri: 'mongodb://localhost:27017/sami-test' },
  },
};
const mongoose = require('mongoose');
mongoose.connect(config[env].mongo.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

module.exports = mongoose;
