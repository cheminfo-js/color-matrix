'use strict';

const chroma = require('chroma-js');
const minMaxMatrix = require('ml-stat').matrix.minMax;

const defaultOptions = {
    mode: 'lab',
    colors: ['white', 'black'],
    domain: ['min', 'max']
};

function matrixToColor(matrix, options) {
    options = Object.assign({}, defaultOptions, options);
    const rows = matrix.length;
    const columns = matrix[0].length;

    let colors = options.colors;
    let colorsL = colors.length;
    let domain = options.domain;
    let domainL = domain.length;

    const minMax = minMaxMatrix(matrix);
    if (domain[0] === 'min') domain[0] = minMax.min;
    if (domain[domainL - 1] === 'max') domain[domainL - 1] = minMax.max;

    let scale;
    if (colorsL < 2 || domainL < 2) {
        throw new RangeError('color and domain array length must be at least 2');
    }
    if (colorsL === domainL) {
        scale = chroma.scale(colors).domain(domain).mode(options.mode);
    } else if (colorsL > domainL && domainL === 2) {
        const newDomain = new Array(colorsL);
        const interval = (domain[1] - domain[0]) / (colorsL - 1);
        newDomain[0] = domain[0];
        let value = domain[0];
        for (let i = 1; i < colorsL - 1; i++) {
            value += interval;
            newDomain[i] = value;
        }
        newDomain[colorsL - 1] = domain[1];
        domain = newDomain;
        domainL = newDomain.length;
        scale = chroma.scale(colors).domain(domain).mode(options.mode);
    } else {
        throw new Error('cannot interpret color and domain arrays');
    }

    if (options.classes) {
        scale = scale.classes(options.classes);
    }

    const result = new Uint8ClampedArray(rows * columns * 4);
    var index = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            var color = scale(matrix[i][j]).rgba();
            result[index++] = color[0];
            result[index++] = color[1];
            result[index++] = color[2];
            result[index++] = color[3] * 255;
        }
    }

    return result;
}

module.exports = matrixToColor;
