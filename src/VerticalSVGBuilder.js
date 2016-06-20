'use strict';

class VerticalSVGBuilder {
    constructor(width, height, steps) {
        this._steps = steps;
        this._step = 0;
        this._svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${steps / 10} ${steps}">`];
    }

    addStep(color) {
        if (this._step === this._steps) {
            throw new Error('too many steps');
        }
        this._svg.push(`<rect width="${this._steps / 10}" height="1" y="${this._step++}" fill="${color}" />`);
    }

    getSVG() {
        if (this._step < this._steps)
            throw new Error(`missing ${this._steps - this._step} steps`);
        return this._svg.join('\n') + '</svg>';
    }
}

module.exports = VerticalSVGBuilder;
