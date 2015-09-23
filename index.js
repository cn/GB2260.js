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
  code = code.toString();
  if (code.length !== 6) {
    throw new Error('Invalid code');
  }

  var data = this._data[code];
  data.code = code;
  if (!data) {
    return null;
  }

  var year = this.year;
  var division = new Division(data, year);

  if (/0{4}$/.test(code)) {
    return division;
  }

  var provinceCode = code.substr(0, 2) + '0000';
  data = this._data[provinceCode];
  data.code = provinceCode;
  division.province = new Division(data, year);

  if (/0{2}$/.test(code)) {
    return division;
  }

  var prefectureCode = code.substr(0, 4) + '00';
  data = this._data[prefectureCode];
  data.code = prefectureCode;
  division.prefecture = new Division(data, year);
  return division;
};

GB2260.prototype.provinces = function() {
  var me = this;
  var rv = [], data;
  Object.keys(me._data).forEach(function(k) {
    if (/0{4}$/.test(k)) {
      data = me._data[k];
      data.code = k;
      rv.push(new Division(data, me.year));
    }
  });
  return rv;
};

GB2260.prototype.prefectures = function(code) {
  code = code.toString();
  if (!/0{4}$/.test(code)) {
    throw new Error('Invalid province code');
  }

  var data = this._data[code];
  if (!data) {
    throw new Error('Invalid province code');
  }

  var me = this;
  data.code = code;

  var province = new Division(data, me.year);
  var pattern = new RegExp('^' + code.substr(0, 2) + '\\d{2}00$');
  var rv = [], division;

  Object.keys(me._data).forEach(function(k) {
    if (pattern.test(k) && k !== code) {
      data = me._data[k];
      data.code = k;
      division = new Division(data, me.year);
      division.province = province;
      rv.push(division);
    }
  });

  return rv;
};

GB2260.prototype.counties = function(code) {
  code = code.toString();
  if (!/[1-9]0{2,3}$/.test(code)) {
    throw new Error('Invalid prefecture code');
  }

  var data = this._data[code];
  if (!data) {
    throw new Error('Invalid prefecture code');
  }
  var me = this;

  data.code = code;
  var prefecture = new Division(data, me.year);

  var provinceCode = code.substr(0, 2) + '0000';
  data = me._data[provinceCode]
  data.code = provinceCode;
  var province = new Division(data, me.year);

  var pattern = new RegExp('^' + code.substr(0, 4));
  var rv = [], division;

  Object.keys(me._data).forEach(function(k) {
    if (pattern.test(k) && k !== code) {
      data = me._data[k];
      data.code = k;
      division = new Division(data, me.year);
      division.province = province;
      division.prefecture = prefecture;
      rv.push(division);
    }
  });

  return rv;
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
