/* eslint-disable import/no-extraneous-dependencies */
/*run command*/
/* npm run test tests/test-map.js */
require = require('esm')(module);
const mocha = require('mocha');
const chai = require('chai');
const WorldMap = require('./index');

const expect = chai.expect;

describe('Check countMaxValue', () => {
    it('Checks if the result is max in array of objects without four last values', () => {
        let obj1 = [{a: 5}, {a: 1}, {a: 3}, {a: 2}, {a: 6}, {a: 4}];
        let obj2 = [{a: 18567, b: 5896}, {c: 785}, {b: 21589}, {a: 45873, b: 69587, c: 36587}, {a: 558, b: 145211, c: 6548}, {a: 18567, b: 5896}, {a: 4598, b: 45879}, {a: 2857, b: 55697445}, {b: 89571}, {c: 4586, b: 7896}];
        let res1 = WorldMap.default.countMaxValue('a', obj1);
        let res2 = WorldMap.default.countMaxValue('b', obj2);
        expect(res1).to.equal(2);
        expect(res2).to.equal(45879);
    });
});

describe('Check countRelativeMaxValue', () => {
    it('Checks if the result is max in array of objects without four last values per 100 000 people', () => {
        let obj1 = [{"cases": 18970356, "population": 331933904}, {"cases": 347204, "population": 9031056}, {"cases": 161562, "population": 5460916}, {"cases": 80407, "population": 2083333}, {"cases": 2505875, "population": 65343001}, {"cases": 2082610, "population": 84772801}, {"cases": 2009317, "population": 60418936}, {"cases": 1563865, "population": 45394236}, {"cases": 533152, "population": 37900561}, {"cases": 361725, "population": 35071966}];
        let obj2 = [{"todayDeaths": 505, "population": 60418936}, {"todayDeaths": 0, "population": 45394236}, {"todayDeaths": 161562, "population": 37900561}, {"todayDeaths": 11, "population": 35071966}, {"todayDeaths": 574, "population": 68057185}, {"todayDeaths": 223, "population": 43606599}, {"todayDeaths": 373, "population": 83912739}, {"todayDeaths": 152, "population": 84505903}, {"todayDeaths": 70, "population": 10182351}];
        let res1 = WorldMap.default.countRelativeMaxValue('cases', obj1);
        let res2 = WorldMap.default.countRelativeMaxValue('todayDeaths', obj2);
        expect(res1).to.equal(3445.07);
        expect(res2).to.equal(0.51);
    });
});

describe('Check countIntervalsMax', () => {
    it('Checks if the result is rounded to the first decimal place according to mathematical rules', () => {
        const max1 = 5715.1;
        const max2 = 0.69;
        let res1 = WorldMap.default.countIntervalsMax(max1);
        let res2 = WorldMap.default.countIntervalsMax(max2);
        expect(res1).to.equal(6000);
        expect(res2).to.equal(1);
    });
});

describe('Check countMarkerClass', () => {
    it('Checks if returned class is equal to expected', () => {
        const maxValue1 = 6000;
        const maxValue2 = 1;
        const param1 = 2958.51;
        const param2 = 0.84;
        let res1 = WorldMap.default.countMarkerClass(param1, maxValue1);
        let res2 = WorldMap.default.countMarkerClass(param2, maxValue2);
        expect(res1).to.equal('icon-size-m');
        expect(res2).to.equal('icon-size-xl');
    });
});