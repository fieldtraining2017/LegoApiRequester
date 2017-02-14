var should = require('chai').should(),
    LegoApiRequster = require('../LegoApiRequster'),
    parts = LegoApiRequster.parts,
    basic = LegoApiRequster.basic;

describe('#basic', function() {
    it('funtional test', function(){
        basic('basic').should.equal('basic with basic');
    });
});

describe('#parts', function() {
    it('get parts test', function(){
        parts('McWYsSJnPY').then(function(res){
            console.log(res);
            should.exist(res);
            done();
        }, function() {
            throw new Error();
        });
    });
});
console.log("mocha");