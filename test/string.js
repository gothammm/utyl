/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const utyl = require('../lib/utyl');

describe('test string cases', () => {
  it('should replace all matching strings/characters', (done) => {
    
    let sampleString = 'Hello my name is John, be like John';
    
    sampleString = utyl.String.replaceAll('John', 'Bill', sampleString);
    
    expect(sampleString).to.contain('Bill');
    expect(sampleString).to.equal('Hello my name is Bill, be like Bill');
    done();
  });
});