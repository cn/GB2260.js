# GB/T 2260

[![GB/T 2260](http://img.shields.io/badge/GB%2FT-2260-blue.svg?style=flat)](https://github.com/cn/GB2260)
[![Build Status](https://img.shields.io/travis/cn/GB2260.js.svg?style=flat)](https://travis-ci.org/cn/GB2260.js)
[![Coverage](https://img.shields.io/coveralls/cn/GB2260.js.svg?style=flat)](https://coveralls.io/r/cn/GB2260.js)
[![Current Release](https://img.shields.io/npm/v/gb2260.svg?style=flat)](https://npmjs.org/package/gb2260)

The latest GB/T 2260 codes. Updated at 2013, published at 2014.

## Installation

Install with npm:

    $ npm install gb2260 --save

## Usage

```js
var gb2260 = require('gb2260');
```

### .data

Get data of all GB/T 2260 codes.

```js
console.log(gb2260.data)
```

### Division(code, year)

Parse a given code, and get information of that code.

```js
var data = new Division(420822)
// => <GB/T 2260> 湖北省 荆门市 沙洋县
```

You can choose a certain year of the GB/T 2260 codes.

```js
var data = new Division(220724)
// => <GB/T 2260> 吉林省 松原市
data.valid()
// => false

var data = new Division(220724, 2012)
// => <GB/T 2260-2012> 吉林省 松原市 扶余县
data.valid()
// => true
```

## License

MIT.
