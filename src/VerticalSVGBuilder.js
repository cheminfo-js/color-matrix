'use strict';

const numberToString = require('./util').numberToString;

const WIDTH = 100;
const BAR_WIDTH = 20;
const FONT_SIZE = 15;
const TICK_SIZE = 5;

const PADDING = Math.ceil(FONT_SIZE / 2);

class VerticalSVGBuilder {
    constructor(size) {
        size = size || 200;
        this._steps = size - FONT_SIZE;
        this._step = 0;
        this._svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}px" height="${size}px" viewBox="0 0 ${WIDTH} ${size}" >`];
    }

    getSteps() {
        return this._steps;
    }

    setLabels(min, max, labels) {
        const factor = this._steps / (max - min);
        for (const label of labels) {
            const y = PADDING + Math.round(factor * (label - min));
            this._svg.push(`<line x1="${BAR_WIDTH - TICK_SIZE}" y1="${y}" x2="${BAR_WIDTH}" y2="${y}" stroke="black" stroke-width="1" />`);
            this._svg.push(`<text x="${BAR_WIDTH + 2}" y="${y}" fill="black" font-size="${FONT_SIZE}" alignment-baseline="central">${numberToString(label)}</text>`);
        }
    }

    addStep(color) {
        if (this._step === this._steps) {
            throw new Error('too many steps');
        }
        const y = PADDING + this._step++;
        this._svg.push(`<line x1="0" y1="${y}" x2="${BAR_WIDTH}" y2="${y}" stroke="${color}" stroke-width="1" />`);
    }

    getSVG() {
        if (this._step < this._steps)
            throw new Error(`missing ${this._steps - this._step} steps`);
        return this._svg.join('\n') + '\n</svg>';
    }
}

module.exports = VerticalSVGBuilder;
