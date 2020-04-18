const restify = require('restify');
const fs = require('fs');
const config = require('config/api');
const routes = require('routes');

const https_options = {
  name: config.name,
  version: config.version
};

if (config.env !== 'test') {
  https_options.key = fs.readFileSync('./ssl/localhost.key');
  https_options.cert = fs.readFileSync('./ssl/localhost.crt');
}

const server = restify.createServer(https_options);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

routes(server);

server.listen(config.port, () => {
  console.log('%s listening at %s', server.name, config.base_url);
  return true;
});

if (config.env === 'test') {
  module.exports = config.base_url;
}
