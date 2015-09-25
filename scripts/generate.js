/**
 * Generate data file for NodeJS.
 */

var fs = require('fs');
var pinyin = require('pinyin');

var _cache = {};


function parse(text) {
  var lines = text.trim().split('\n');
  var rv = {};

  lines.forEach(function(line) {
    var bits = line.split('\t');
    var code = bits[0], name = bits[1];
    var pronoun = _cache[name];

    if (!pronoun) {
      pronoun = pinyin(name).map(function(ns) {
        if (ns.length > 1) {
          console.warn(name, ns);
        }
        return ns[0];
      }).join(' ');
      _cache[name] = pronoun;
    }

    rv[code] = {
        name: name,
        pinyin: pronoun,
    }
  });

  return rv;
}

var names = fs.readdirSync('data');
names.forEach(function(name) {
  var m = name.match(/^GB2260-(\d+).txt$/);
  if (!m) return;
  var revision = m[1];
  var text = fs.readFileSync(__dirname + '/../data/' + name, 'utf8');
  var data = JSON.stringify(parse(text), null, 2);
  console.log('write ' + revision);
  fs.writeFileSync(__dirname + '/../lib/' + revision + '.json', data);
});
