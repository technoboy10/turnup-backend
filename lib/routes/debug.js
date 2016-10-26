const Router = require('restify-router').Router;
const debug = new Router();

function respond (req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

debug.get('/hello/:name', respond);
module.exports = debug;
