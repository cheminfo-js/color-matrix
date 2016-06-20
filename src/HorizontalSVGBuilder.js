'use strict';

class HorizontalSVGBuilder {
    constructor(width, height, steps) {
        this._steps = steps;
        this._step = 0;
        this._svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${steps} ${steps / 10}">`];
    }

    addStep(color) {
        if (this._step === this._steps) {
            throw new Error('too many steps');
        }
        this._svg.push(`<rect width="1" height="${this._steps / 10}" x="${this._step++}" fill="${color}" />`);
    }

    getSVG() {
        if (this._step < this._steps)
            throw new Error(`missing ${this._steps - this._step} steps`);
        return this._svg.join('\n') + '</svg>';
    }
}

module.exports = HorizontalSVGBuilder;
