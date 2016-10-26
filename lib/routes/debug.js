const Router = require('restify-router').Router;
const debug = new Router();

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'Lab'
    }
});

function respond (req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

function dbGet (req, res, next) { // Using the db from Lab 3 for testing
    knex
    .select('Id')
    .from('store')
    .where('Name', req.params.name)
    .then(function (qty) {
        res.send(qty[0]);
        next();
    });
}

debug.get('/hello/:name', respond);
debug.get('/db/:name', dbGet);
module.exports = debug;
