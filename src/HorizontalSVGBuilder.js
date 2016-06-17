'use strict';

class HorizontalSVGBuilder {
    constructor(width, height) {
        this._svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 200 20">`];
        this._step = 0;
    }

    addStep(color) {
        if (this._step === 200) {
            throw new Error('too many steps');
        }
        this._svg.push(`<rect width="1" height="20" x="${this._step++}" fill="${color}" />`);
    }

    getSVG() {
        return this._svg.join('\n') + '</svg>';
    }
}

module.exports = HorizontalSVGBuilder;
