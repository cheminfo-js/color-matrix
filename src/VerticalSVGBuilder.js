'use strict';

class VerticalSVGBuilder {
    constructor(width, height) {
        this._svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 20 200">`];
        this._step = 0;
    }

    addStep(color) {
        if (this._step === 200) {
            throw new Error('too many steps');
        }
        this._svg.push(`<rect width="20" height="1" y="${this._step++}" fill="${color}" />`);
    }

    getSVG() {
        return this._svg.join('\n') + '</svg>';
    }
}

module.exports = VerticalSVGBuilder;
