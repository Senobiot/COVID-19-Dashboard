/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
require = require('esm')(module/* , options */);
const mocha = require('mocha');
const chai = require('chai');
const create = require('./index');

const expect = chai.expect;

describe('Reverse String Test', () => {
  it('Checks if the strings is reversed', () => {
    console.log(create);
    const str1 = create.default.transformNumbers(17395);
    const str2 = create.default.transformNumbers(631435);

    expect(str1).to.equal('17 395');
    expect(str2).to.equal('631 435');
  });
});
