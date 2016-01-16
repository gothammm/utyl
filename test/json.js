/* global it */
/* global describe */
'use strict';
const Chai = require('chai');
const expect = Chai.expect;
const utyl = require('../lib/utyl');

describe('test json cases', () => {
  it('should replace a basic pattern with value', (done) => {
    let jsonData = {
      firstName: '@{firstName}',
      lastName: '@{lastName}'
    };
    
    let transformed = utyl.JSON(jsonData).fill({
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(transformed.firstName).to.equal('John');
    expect(transformed.lastName).to.equal('Doe');
    done();
  });
});