const restify = require('restify');
const server = restify.createServer({
    name: 'turnup',
});

server.listen(8080);
