/**
 * GB2260 parser
 */

var CURRENT = 2013;

var data = {};
// Use your own data
if (process.env.GB2260_DATA) {
  data = require(process.env.GB2260_DATA);
} else {
  data = require('./GB2260');
}

exports = module.exports = {
  get data() {
    return data;
  },
};

var YEARS = Object.keys(data);

function Division(code, year) {
  this.code = code.toString();
  if (year && YEARS.indexOf(year.toString()) === -1) {
    throw new Error('year must be in ' + YEARS.toString());
  }
  this.year = year;
}

Division.prototype = {
  get data() {
    if (this.year) {
      return data[this.year.toString()];
    }
    return data[CURRENT.toString()];
  },
  get province() {
    return this.data[this.code.slice(0, 2) + '0000'];
  },
  get prefecture() {
    if (/0000$/.test(this.code)) return null;
    return this.data[this.code.slice(0, 4) + '00'];
  },
  get county() {
    if (/00$/.test(this.code)) return null;
    return this.data[this.code];
  },
  valid: function() {
    if (!/0000$/.test(this.code) && !this.prefecture) {
      return false;
    }
    if (!/00$/.test(this.code) && !this.county) {
      return false;
    }
    if (!this.province) {
      return false;
    }
    return true;
  },
  toString: function() {
    return [this.province, this.prefecture, this.county].join(' ').trim();
  },
  valueOf: function() {
    return this.toString();
  },
  inspect: function() {
    // inspect is designed for console.log
    var prefix = 'GB/T 2260';
    if (this.year) {
      prefix += '-' + this.year;
    }
    return '<' + prefix + '> ' + this.toString();
  },
  toJSON: function() {
    return {
      province: this.province,
      prefecture: this.prefecture,
      county: this.county
    };
  },
};

exports.Division = Division;
