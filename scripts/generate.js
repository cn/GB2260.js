/**
 * Generate data file for NodeJS.
 */

var fs = require('fs');


function parse(text) {
  var lines = text.trim().split('\n');
  var rv = {};

  lines.forEach(function(line) {
    var bits = line.split('\t');
    var code = bits[0], name = bits[1];
    rv[code] = name
  });

  return rv;
}

var revisions = [];

fs.readdirSync('data').forEach(function(name) {
  var m = name.match(/^(\d+).txt$/);
  if (!m) return;
  var revision = m[1];
  revisions.push(revision);
  var text = fs.readFileSync(__dirname + '/../data/' + name, 'utf8');
  var data = JSON.stringify(parse(text), null, 2);
  console.log('write ' + revision);
  fs.writeFileSync(__dirname + '/../lib/' + revision + '.json', data);
});

revisions.sort(function(a, b) {
  var aYear = parseInt(a.substr(0, 4), 10);
  var bYear = parseInt(b.substr(0, 4), 10);
  if (aYear != bYear) {
    return bYear - aYear;
  }

  var aMonth = parseInt(a.substr(4, 6) || 13, 10);
  var bMonth = parseInt(b.substr(4, 6) || 13, 10);
  return bMonth - aMonth;
});
fs.writeFileSync(__dirname + '/../lib/revisions.json', JSON.stringify(revisions));
