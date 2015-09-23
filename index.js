/**
 * GB2260 parser
 */

LATEST_YEAR = 2014;

function GB2260(year, data) {
  year = year || LATEST_YEAR;
  this.year = year;
  if (!data) {
    data = require('./lib/' + year);
  }
  this._data = data;
}

GB2260.prototype.get = function(code) {
  code = code.toString().replace(/0+$/, '');
  if (code.length < 2 || code.length > 6) {
    throw new Error('Invalid code');
  }
  var year = this.year;
  var data = this._data[code.substr(0, 2)];
  if (!data) {
    throw new Error('Invalid code');
  }

  var province = new Division(data, year);
  if (code.length === 2) {
    return province;
  }
  if (code.length === 3) {
    code += '0';
  }
  data = data.prefectures[code.substr(0, 4)];
  if (!data) {
    throw new Error('Invalid code');
  }

  var prefecture = new Division(data, year);
  if (code.length === 4) {
    prefecture.province = province;
    return prefecture;
  }

  if (code.length === 5) {
    code += '0';
  }
  data = data.counties[code];
  if (!data) {
    throw new Error('Invalid code');
  }

  var county = new Division(data, year);
  county.province = province;
  county.prefecture = prefecture;
  return county;
};

GB2260.prototype.provinces = function() {
  var me = this;
  return Object.keys(me._data).map(function(k) {
    return new Division(me._data[k], me.year);
  });
};

GB2260.prototype.prefectures = function(code) {
  code = code.toString().replace(/0+$/, '');
  if (code.length > 2) {
    throw new Error('Invalid province code');
  }
  var data = this._data[code];
  if (!data) {
    throw new Error('Invalid province code');
  }
  var me = this;
  var province = new Division(data, me.year);

  return Object.keys(data.prefectures).map(function(k) {
    var division = new Division(data.prefectures[k], me.year);
    division.province = province;
    return division;
  });
};

GB2260.prototype.counties = function(code) {
  code = code.toString().replace(/0+$/, '');
  if (code.length > 4 || code.length < 3) {
    throw new Error('Invalid prefecture code');
  }
  if (code.length === 3) {
    code += '0';
  }

  var data = this._data[code.substr(0, 2)];
  if (!data) {
    throw new Error('Invalid prefecture code');
  }

  var year = this.year;
  var province = new Division(data, year);

  data = data.prefectures[code];
  if (!data) {
    throw new Error('Invalid prefecture code');
  }
  var prefecture = new Division(data, year);

  return Object.keys(data.counties).map(function(k) {
    var division = new Division(data.counties[k], year);
    division.province = province;
    division.prefecture = prefecture;
    return division;
  });
};


function Division(data, year) {
  this.code = data.code;
  this.name = data.name;
  this.pinyin = data.pinyin;
  this.year = year;
}

Division.prototype.toString = function() {
  var rv = [];
  if (this.province) {
    rv.push(this.province.name);
  }
  if (this.prefecture) {
    rv.push(this.prefecture.name);
  }
  rv.push(this.name);
  return rv.join(' ');
};

Division.prototype.valueOf = function() {
  return this.toString();
};

Division.prototype.inspect = function() {
  var prefix = 'GB/T 2260';
  if (this.year) {
    prefix += '-' + this.year;
  }
  return '<' + prefix + '> ' + this.code + ' ' + this.toString();
};

Division.prototype.toJSON = function() {
  return {
    name: this.name,
    code: this.code,
    year: this.year,
  };
};

exports.Division = Division;
exports.GB2260 = GB2260;
