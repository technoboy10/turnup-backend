const Router = require('restify-router').Router;
const vw = require('vowpal-wabbit');
const ai = new Router();

const sql = require('knex')({ // Connect to SQL server with Heroku environment variables
    client: 'mysql',
    connection: {
        host: process.env.SQLHOST,
        user: process.env.SQLUSER,
        password: process.env.SQLPASS,
        database: 'turnup'
    }
});

const aiClient = vw.createClient(26542,'turnup-ml.westcentralus.cloudapp.azure.com');

function flowAfter (req, res, next) {
    var bpm = 0;
    var tune = 0;
    var signature = 0;

    sql
    .select('*') // Get the training information for the song with ID req.params.id
    .from('song_train')
    .where('id', req.params.id)
    .then(function (info) {
        bpm = info[0].bpm;
        signature = info[0].signature;
        if (info[0].key.indexOf('m') == -1){ // tl;dr we need an integer value for key, so minor => -1 and major => 1
            tune = 1;
        } else {
            tune = -1;
        }

        var vwFormat = 'bpm:{0} tune:{1} signature:{2}'.format(bpm, tune, signature);

        aiClient.getPrediction(vwFormat, function (err, result) {
            sql
            .select('*') // Get all information from song_info table for predicted song
            .from('song_info')
            .where('id', Math.round(result))
            .then(function (info) {
                res.send(info[0]); // info[0] is the first returned row
                next();
            });
        });
    });
}

ai.get('/flow/:id', flowAfter);
module.exports = ai;
