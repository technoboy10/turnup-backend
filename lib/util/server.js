const restify = require('restify');
const server = restify.createServer({
    name: 'turnup',
});

const debug = require('../routes/debug'); // TODO: remove debug routes
debug.applyRoutes(server, '/debug');

const info = require('../routes/info');
info.applyRoutes(server, '/info'); // all info routes go under the /info url

module.exports = server;
