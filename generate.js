/**
 * Generate data file for NodeJS.
 */

var fs = require('fs');

var CURRENT = 2013;
var LISTS = [2012, 2006];

function parse(text) {
  var lines = text.trim().split('\n');
  var rv = {};

  lines.forEach(function(line) {
    var bits = line.split('\t');
    rv[bits[0]] = bits[1];
  });

  return rv;
}

function read(year) {
  var name = 'GB2260.txt';
  if (year) {
    name = 'GB2260-' + year + '.txt';
  }
  return fs.readFileSync(__dirname + '/data/' + name, 'utf8');
}

var rv = {};
rv[CURRENT] = parse(read());

var i = LISTS[0];
while (i >= LISTS[1]) {
  rv[i] = parse(read(i));
  i = i - 1;
}

console.log(JSON.stringify(rv, null, 2));
