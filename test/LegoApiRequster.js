var should = require('chai').should(),
    scapegoat = require('../LegoApiRequster'),
    escape = scapegoat.parts,
    basic = scapegoat.basic;

describe('#basic', function() {
    it('funtional test', function(){
        basic('basic').should.equal('basic with basic');
    });
});