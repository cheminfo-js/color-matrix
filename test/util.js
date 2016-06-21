'use strict';

const util = require('../src/util');

describe('numberToString', function () {
    const numberToString = util.numberToString;

    it('small whole numbers', function () {
        numberToString(0).should.equal('0');
        numberToString(1).should.equal('1');
        numberToString(20).should.equal('20');
        numberToString(357).should.equal('357');
        numberToString(-12).should.equal('−12');
        numberToString(-634).should.equal('−634');
    });

    it('big whole numbers', function () {
        numberToString(1000).should.equal('1×10³');
    });

    it('small decimal numbers', function () {
        numberToString(0.01).should.equal('0.01');
    });
});
