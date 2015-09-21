# GB/T 2260

[![GB/T 2260](http://img.shields.io/badge/GB%2FT-2260-blue.svg?style=flat)](https://github.com/cn/GB2260)
[![Build Status](https://img.shields.io/travis/cn/GB2260.js.svg?style=flat)](https://travis-ci.org/cn/GB2260.js)
[![Coverage](https://img.shields.io/coveralls/cn/GB2260.js.svg?style=flat)](https://coveralls.io/r/cn/GB2260.js)
[![Current Release](https://img.shields.io/npm/v/gb2260.svg?style=flat)](https://npmjs.org/package/gb2260)

The latest GB/T 2260 codes. Spec v0.1 supported.

## Installation

Install with npm:

    $ npm install gb2260 --save

## Usage

```js
var gb2260 = require('gb2260');
```

## GB2260

```js
new gb2260.GB2260(year);
```

Interface for GB2260. Currently support [GB2260 spec v0.1](https://github.com/cn/GB2260/blob/v0.1/spec.md).

### .get(code)

Get division for the given code.

### .provinces()

Return a list of provinces in Division data structure.

### .prefectures(code)

Return a list of prefecture level cities in Division data structure.

### .counties(code)

Return a list of counties in Division data structure.

## License

MIT.
