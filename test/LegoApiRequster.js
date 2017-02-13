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
        throw new Error("test");
    });
});