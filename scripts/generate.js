/**
 * Generate data file for NodeJS.
 */

var fs = require('fs');

function parse(text) {
  var lines = text.trim().split('\n');
  var rv = {};

  lines.forEach(function(line) {
    var bits = line.split('\t');
    rv[bits[0]] = bits[1];
  });

  return rv;
}

var names = fs.readdirSync('data');
names.forEach(function(name) {
  var m = name.match(/^GB2260-(\d+).txt$/);
  if (!m) return;
  var year = m[1];
  var text = fs.readFileSync(__dirname + '/../data/' + name, 'utf8');
  var data = JSON.stringify(parse(text), null, 2);
  console.log('write ' + year);
  fs.writeFileSync(__dirname + '/../lib/' + year + '.json', data);
});
