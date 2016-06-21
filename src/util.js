'use strict';

const expNumbers = {
    0: '⁰',
    1: '¹',
    2: '²',
    3: '³',
    4: '⁴',
    5: '⁵',
    6: '⁶',
    7: '⁷',
    8: '⁸',
    9: '⁹'
};

const minus = '−';
const expMinus = '⁻';
const times = '×10';

exports.numberToString = function (number) {
    var result;
    if (number === 0) {
        return '0';
    } else if (Math.abs(number) >= 1) {
        result = number.toPrecision(3);
        result = formatPrecision(result);
    } else if (Math.log10(Math.abs(number)) >= -5) {
        result = number.toFixed(5);
    } else {
        result = number.toExponential(3);
        result = formatPrecision(result);
    }
    return result.replace(/\.?0+(×|$)/, '$1');
};

function formatPrecision(result) {
    if (result.charAt(0) ===  '-') {
        result = result.replace('-', minus);
    }
    let eIndex = result.indexOf('e');
    if (eIndex > -1) {
        result = result.replace('e', times);
        let expIndex = eIndex + 3;
        if (result.includes('-')) {
            result = result.replace('-', expMinus);
            expIndex += 1;
        }
        let exp = result.substring(expIndex);
        let newExp = Array.from(exp).map(val => expNumbers[val]).join('');
        result = result.slice(0, expIndex) + newExp;
    }
    return result;
}
