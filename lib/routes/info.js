const Router = require('restify-router').Router;
const info = new Router();

const sql = require('knex')({ // Connect to SQL server with Heroku environment variables
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
    .select('*') // Get all information from song_info table
    .from('song_info')
    .where('id', req.params.id) // Song ID specified by id parameter
    .then(function (info) {
        res.send(info[0]); // info[0] is the first returned row
        next();
    });

}

info.get('/song/:id', getInfo);
module.exports = info;
