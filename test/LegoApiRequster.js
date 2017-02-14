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
		return parts('McWYsSJnPY')
			.then(function(result) {
				expect(result).to.not.be.undefined;
        expect(result.list).to.not.be.undefined;
        expect(result.hasNext).to.be.oneOf([true, false]);
        if (result.hasNext) {
          result.next().then();
        }
			})
			.catch(function(m) {
				throw new Error('was not supposed to fail');
			});
	});

  it('get all parts test', function(){
		// http://stackoverflow.com/questions/26571328/how-do-i-properly-test-promises-with-mocha-and-chai
		return parts('McWYsSJnPY')
			.then(function(result) {
        exceptor = (result) => {
          expect(result).to.not.be.undefined;
          expect(result.list).to.not.be.undefined;
          expect(result.hasNext).to.be.oneOf([true, false]);
          if (result.hasNext) {
            it('next, ' + result.page, function(){
              return result.next().then(function(res){ console.log("hmm"); exceptor(res); });
            });
          }
        };
        exceptor(result);
			})
			.catch(function(m) {
				throw new Error('was not supposed to fail');
			});
	});
});
