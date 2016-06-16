'use strict';

const matrixToColor = require('..');

describe('matrix to color', function () {
    it('default options', function () {
        var result = matrixToColor([[0, 1], [1, 0]]);
        Array.from(result).should.eql([
            255, 255, 255, 255,
            0, 0, 0, 255,
            0, 0, 0, 255,
            255, 255, 255, 255
        ]);
    });

    it('custom mode', function () {
        var result = matrixToColor([[0, 0.5], [1, 0]], {mode: 'rgb'});
        Array.from(result).should.eql([
            255, 255, 255, 255,
            128, 128, 128, 255,
            0, 0, 0, 255,
            255, 255, 255, 255
        ]);
    });

    it('multiple colors', function () {
        var result = matrixToColor([[0, 0.5], [1, 0]], {mode: 'rgb', colors: ['#000000', '#808080', '#ffffff']});
        Array.from(result).should.eql([
            0, 0, 0, 255,
            128, 128, 128, 255,
            255, 255, 255, 255,
            0, 0, 0, 255,
        ]);
    });

    it('multiple colors, custom domain', function () {
        var result = matrixToColor([[0, 1], [2, 4]], {
            mode: 'rgb',
            colors: ['#000000', '#808080', '#ffffff'],
            domain: [0, 4]
        });
        Array.from(result).should.eql([
            0, 0, 0, 255,
            64, 64, 64, 255,
            128, 128, 128, 255,
            255, 255, 255, 255
        ]);
    });

    it('multiple colors, uneven domain', function () {
        var result = matrixToColor([[0, 1], [2, 4]], {
            mode: 'rgb',
            colors: ['#000000', '#808080', '#ffffff'],
            domain: [0, 1, 4]
        });
        Array.from(result).should.eql([
            0, 0, 0, 255,
            128, 128, 128, 255,
            170, 170, 170, 255,
            255, 255, 255, 255
        ]);
    });
});
