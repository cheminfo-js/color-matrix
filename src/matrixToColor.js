'use strict';

const chroma = require('chroma-js');
const minMaxArray = require('ml-stat').array.minMax;
const arrayUtils = require('ml-array-utils');

const HorizontalSVGBuilder = require('./HorizontalSVGBuilder');
const VerticalSVGBuilder = require('./VerticalSVGBuilder');

const scaleOptions = {
    min: 0,
    max: 1e6,
    inplace: true
};

const defaultOptions = {
    mode: 'lab',
    colors: ['white', 'black'],
    domain: ['min', 'max'],
    classes: 0
};

function matrixToColor(matrix, options) {
    options = Object.assign({}, defaultOptions, options);
    const rows = matrix.length;
    const columns = matrix[0].length;
    const size = rows * columns;

    let colors = options.colors.slice();
    let colorsL = colors.length;
    let domain = options.domain.slice();
    let domainL = domain.length;

    const values = new Array(rows * columns);
    var index = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            values[index++] = matrix[i][j];
        }
    }

    const minMax = minMaxArray(values);
    arrayUtils.scale(values, scaleOptions);

    if (domain[0] === 'min') domain[0] = minMax.min;
    if (domain[domainL - 1] === 'max') domain[domainL - 1] = minMax.max;

    arrayUtils.scale(domain, scaleOptions);

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

    const result = new Uint8ClampedArray(size * 4);
    index = 0;
    for (var k = 0; k < size; k++) {
        var color = scale(values[k]).rgba();
        result[index++] = color[0];
        result[index++] = color[1];
        result[index++] = color[2];
        result[index++] = color[3] * 255;
    }

    if (options.scale) {
        const SVGBuilder = options.scale.type === 'vertical' ? VerticalSVGBuilder : HorizontalSVGBuilder;
        const steps = options.scale.steps || 200;
        const svgBuilder = new SVGBuilder(options.scale.width, options.scale.height, steps);
        for (let i = scaleOptions.min; i < scaleOptions.max; i += (scaleOptions.max / steps)) {
            svgBuilder.addStep(scale(i));
        }
        const svg = svgBuilder.getSVG();
        return {image: result, scale: svg};
    }

    return result;
}

module.exports = matrixToColor;
