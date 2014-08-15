
var request = require('superagent'),
    mocha = require('mocha'),
    fs = require('fs'),
    nock = require('nock'),
    expect = require('chai').expect,
    app = require('../server/app');

describe('Router', function() {
  
    var host = 'http://localhost:5000',
        server;

    beforeEach(function () {
        server = app.listen(5000);
    })
    
    afterEach(function () {
        server.close();
    })

    describe('Service', function () {

        it('Respond with a success when requesting a valid service path', function (done) {
            var mock = nock('http://next-router-test-app-badger-1.herokuapp.com').get('/badger').reply(200, '');
            request.get(host + '/badger').end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(mock.isDone()).to.be.true;
                    done();
            })
        })
        
        it('Respond with a not found message when requesting an invalid service path', function (done) {
            var mock = nock('http://next-router-test-app-badger-1.herokuapp.com').get('/four-oh-four').reply(404, '');
            request.get(host + '/four-oh-four').end(function (err, res) {
                    expect(res.status).to.equal(404);
                    done();
            })
        })


    });
});