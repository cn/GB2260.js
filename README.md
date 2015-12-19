# GB/T 2260

[![GB/T 2260](https://img.shields.io/badge/GB%2FT%202260-v0.3pre-blue.svg)](https://github.com/cn/GB2260)
[![Build Status](https://img.shields.io/travis/cn/GB2260.js.svg?style=flat)](https://travis-ci.org/cn/GB2260.js)
[![Coverage](https://img.shields.io/coveralls/cn/GB2260.js.svg?style=flat)](https://coveralls.io/r/cn/GB2260.js)
[![Current Release](https://img.shields.io/npm/v/gb2260.svg?style=flat)](https://npmjs.org/package/gb2260)

The latest GB/T 2260 codes. Read the [GB2260 Specification](https://github.com/cn/GB2260/blob/v0.2/spec.md).

## Installation

Install with npm:

    $ npm install gb2260 --save

## Usage

```js
var gb2260 = require('gb2260');
// register revision data
gb2260.register('201410', require('gb2260/lib/201410'))
```

## GB2260

```js
var gb = new gb2260.GB2260(revision);
```

Interface for GB2260.

### .get(code)

Get division for the given code.

```js
var division = gb.get("110105")
// <GB/T 2260-201410> 110105 北京市 市辖区 朝阳区

division.name
// 朝阳区
division.code
// 110105
division.revision
// 201410
division.pinyin
// zhāo yáng qū

division.province
// <GB/T 2260-201410> 110000 北京市
division.prefecture
// <GB/T 2260-201410> 110100 市辖区

division.toJSON()
// { name: '朝阳区', code: '110105', revision: 201410 }
division.toString()
// 北京市 市辖区 朝阳区
division.valueOf()
// 北京市 市辖区 朝阳区
```

### .provinces()

Return a list of provinces in Division data structure.

```js
gb.provinces()
```

### .prefectures(code)

Return a list of prefecture level cities in Division data structure.

```js
gb.prefectures(110000)
```

### .counties(code)

Return a list of counties in Division data structure.

```js
gb.counties(110100)
```

## revisions()

Return a list of available revisions.

```js
gb2260.revisions()
// [ '201410', '201308', ..., '200212']
```

## License

MIT.
