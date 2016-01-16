/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const utyl = require('../lib/utyl');

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
    let helper = utyl.Object;
    expect(helper.ptoo(someObject, 'a')).to.instanceof(Object);
    expect(helper.ptoo(someObject, 'b')).to.be.null;
    expect(helper.ptoo(someObject, 'a.b')).to.equal(1);
    done();
  });
  
  it('should get all possible paths of an object', (done) => {
    let someObject = {
      a: 1,
      b: { c: 1 },
      d: { 
        e: () => true
      },
      f: { 
        g: {
          h: 10,
          z: 20
        }
      }
    };
    let result = utyl.Object.otop(someObject);
    expect(result).to.have.length(5);
    expect(result[0].path).to.equal('a');
    expect(result[result.length - 1].path).to.equal('f.g.z');
    done();
  });
  
  it('should get paths for nested object', (done) => {
    let nestedObject = {};
    for (var i = 10; i >= 0; i--) {
      if (i === 10) {
        nestedObject[`a${i}`] = i;
      } else {
        let obj = {};
        obj[`a${i}`] = nestedObject;
        nestedObject = obj;
      }
    }
    let result = utyl.Object.otop(nestedObject);
    expect(result).to.have.length(1);
    expect(result[0].value).to.equal(10);
    done();
  });
  
  it('should extend from another object', (done) => {
    let target = {
      a: 1,
      b: { 
        c: 5
      }
    };
    let source = {
      b: {
        c: 10
      }
    };
    
    let result = utyl.Object.deepExtend(target, source);
    expect(result).to.not.be.null;
    expect(result).to.be.instanceof(Object);
    expect(result.b.c).to.equal(10);
    done();
  });
});

