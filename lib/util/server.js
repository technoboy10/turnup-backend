const restify = require('restify');
const server = restify.createServer({
    name: 'turnup',
});

const debug = require('../routes/debug');
debug.applyRoutes(server, '/debug');

const info = require('../routes/info');
info.applyRoutes(server, '/info');

module.exports = server;
