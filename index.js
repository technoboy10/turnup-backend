const server = require('./lib/util/server');

console.log(process.env); //eslint-disable-line
server.listen((process.env.PORT || 8080), function () {
    console.log('%s listening at %s', server.name, server.url); //eslint-disable-line
});
