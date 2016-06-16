# matrix-to-color

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Create an image with pixel colors based on the values of a matrix

## API

### matrixToColor(matrix, options)

Returns a `Uint8ClampedArray` with the image data.

__Options__

Most options are passed directly to the chroma.js library. See [chroma.js docs](http://gka.github.io/chroma.js/#color-scales)

* mode: color mode used for interpolation (default: `'lab'`)
* colors: array of color steps. Must contain at least two colors (default: `['white', 'black']`)
* domain: array of value steps. Must be sorted in ascending order and contain at least two values. You can place the special values `min` and `max` at the extremities to use the min/max value of the matrix (default: `['min', 'max']`)
* classes: if > 0, only this number of colors will be used (default: `0`)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/matrix-to-color.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/matrix-to-color
[travis-image]: https://img.shields.io/travis/cheminfo-js/matrix-to-color/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/matrix-to-color
[david-image]: https://img.shields.io/david/cheminfo-js/matrix-to-color.svg?style=flat-square
[david-url]: https://david-dm.org/cheminfo-js/matrix-to-color
[download-image]: https://img.shields.io/npm/dm/matrix-to-color.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/matrix-to-color
