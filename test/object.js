/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const utyl = require('../lib/utyl');

// Set to prototype
utyl.Object.global();

describe('test object cases', () => {
  it('should get value by path', (done) => {
    
    let someObject = { 
      a: {
        b: 1
      },
      c: {
        d: {
          e: 2
        }
      },
      x: ['1', '2', '3']
    };
    
    expect(someObject.path('a')).to.instanceof(Object);
    expect(someObject.path('b')).to.be.null;
    expect(someObject.path('a.b')).to.equal(1);
    done();
  });
});

