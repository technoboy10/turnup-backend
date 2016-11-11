const Router = require('restify-router').Router;
const info = new Router();

const sql = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.SQLHOST,
        user: process.env.SQLUSER,
        password: process.env.SQLPASS,
        database: 'turnup'
    }
});

function getInfo (req, res, next) {
    sql
    .select('*')
    .from('song_info')
    .where('id', req.params.name)
    .then(function (info) {
        res.send(info[0]);
        next();
    });

}

info.get('/song/:id', getInfo);
module.exports = info;
