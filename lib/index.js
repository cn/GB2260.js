/**
 * GB2260 parser
 */

var REVISIONS = require('./revisions');
var DATABASE = {};

function GB2260(revision, data) {
  revision = revision || REVISIONS[0];
  this.revision = revision;
  if (!data) {
    data = DATABASE[revision.toString()];
  }
  this._data = data;
}

GB2260.prototype.get = function(code) {
  code = code.toString();
  if (code.length !== 6) {
    throw new Error('Invalid code');
  }

  var name = this._data[code];
  if (!name) {
    return null;
  }

  var revision = this.revision;
  var division = new Division(code, name, revision);

  if (/0{4}$/.test(code)) {
    return division;
  }

  var provinceCode = code.substr(0, 2) + '0000';
  name = this._data[provinceCode];
  division.province = new Division(provinceCode, name, revision);

  if (/0{2}$/.test(code)) {
    return division;
  }

  var prefectureCode = code.substr(0, 4) + '00';
  name = this._data[prefectureCode];
  division.prefecture = new Division(prefectureCode, name, revision);
  return division;
};

GB2260.prototype.codes = function() {
  if (!this._codes) {
    this._codes = Object.keys(this._data).sort();
  }
  return this._codes;
};

GB2260.prototype.provinces = function() {
  var me = this;
  var rv = [], name;
  this.codes().forEach(function(k) {
    if (/0{4}$/.test(k)) {
      name = me._data[k];
      rv.push(new Division(k, name, me.revision));
    }
  });
  return rv;
};

GB2260.prototype.prefectures = function(code) {
  code = code.toString();
  if (!/0{4}$/.test(code)) {
    throw new Error('Invalid province code');
  }

  var name = this._data[code];
  if (!name) {
    throw new Error('Invalid province code');
  }

  var me = this;
  var province = new Division(code, name, me.revision);
  var pattern = new RegExp('^' + code.substr(0, 2) + '\\d{2}00$');
  var rv = [], division;

  this.codes().forEach(function(k) {
    if (pattern.test(k) && k !== code) {
      name = me._data[k];
      division = new Division(k, name, me.revision);
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

  var name = this._data[code];
  if (!name) {
    throw new Error('Invalid prefecture code');
  }
  var me = this;
  var prefecture = new Division(code, name, me.revision);

  var provinceCode = code.substr(0, 2) + '0000';
  name = me._data[provinceCode]
  var province = new Division(provinceCode, name, me.revision);

  var pattern = new RegExp('^' + code.substr(0, 4));
  var rv = [], division;

  this.codes().forEach(function(k) {
    if (pattern.test(k) && k !== code) {
      name = me._data[k];
      division = new Division(k, name, me.revision);
      division.province = province;
      division.prefecture = prefecture;
      rv.push(division);
    }
  });

  return rv;
};


function Division(code, name, revision) {
  this.code = code;
  this.name = name;
  this.revision = revision;
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
  if (this.revision) {
    prefix += '-' + this.revision;
  }
  return '<' + prefix + '> ' + this.code + ' ' + this.toString();
};

Division.prototype.toJSON = function() {
  return {
    name: this.name,
    code: this.code,
    revision: this.revision
  };
};

exports.revisions = function() {
  return REVISIONS;
};

exports.register = function(revision, data) {
  DATABASE[revision] = data;
};

exports.Division = Division;
exports.GB2260 = GB2260;
