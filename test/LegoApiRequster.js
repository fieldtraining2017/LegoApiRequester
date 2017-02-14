var should = require('chai').should(),
    expect = require('chai').expect,
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
        // http://stackoverflow.com/questions/26571328/how-do-i-properly-test-promises-with-mocha-and-chai
        //return expect(parts('McWYsSJnPY')).to.not.be.undefined;
        return parts('McWYsSJnPY')
            .then(function(res) { expect(res).to.not.be.undefined; })
            .catch(function(m) { throw new Error('was not supposed to fail'); })
                ;
    });
});
console.log("mocha");