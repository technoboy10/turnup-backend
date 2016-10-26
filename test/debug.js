/* eslint-disable no-unused-vars */
const supertest = require('supertest');
const should = require('chai').should();
const server = supertest(require('../lib/util/server'));

describe('Unit test debug', function (){
    it('should return 200', function (done) {
        server
        .get('/debug/hello/name')
        .expect(200)
        .end(function (err,res) {
            res.status.should.equal(200);
            res.error.should.equal(false);
            done();
        });
    });
});
