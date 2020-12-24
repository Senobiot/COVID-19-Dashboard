/* run command */
/* npm run test tests/test-statistics.js */
require = require('esm')(module/* , options */);
const mocha = require('mocha');
const chai = require('chai');
const create = require('./unit-statistics');

const { expect } = chai;

describe('Break the number into triads', () => {
  it('Checks if a string is a triad', () => {
    const str1 = create.default.transformNumbers(17395);
    const str2 = create.default.transformNumbers(631435);
    const str3 = create.default.transformNumbers(79219657);
    expect(str1).to.equal('17 395');
    expect(str2).to.equal('631 435');
    expect(str3).to.equal('79 219 657');
  });
});

describe('Calculation of indicators per hundred thousand', () => {
  it('checking the correctness of calculations', () => {
    const str1 = create.default.getPerPopulation(789, 1000000);
    const str2 = create.default.getPerPopulation(631435, 25567123);
    const str3 = create.default.getPerPopulation(543789, 47986234);
    expect(str1).to.equal(78.9);
    expect(str2).to.equal(2469.71);
    expect(str3).to.equal(1133.22);
  });
});
