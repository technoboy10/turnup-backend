const restify = require('restify');
const server = restify.createServer({
    name: 'turnup',
});

const debug = require('../routes/debug');
debug.applyRoutes(server, '/debug');

module.exports = server;
