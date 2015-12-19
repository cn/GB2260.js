/**
 * Generate data file for NodeJS.
 */

var fs = require('fs');


function parse(text) {
  var lines = text.trim().split('\n');
  var rv = {};

  lines.slice(1).forEach(function(line) {
    var bits = line.split('\t');
    var code = bits[2], name = bits[3];
    rv[code] = name
  });

  return rv;
}


function createJSON() {
  var revisions = [];

  fs.readdirSync('data').forEach(function(name) {
    var m = name.match(/^(\d+).tsv/);
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
}


function createContrib() {
  fs.readdirSync('data/contrib').forEach(function(name) {
    var m = name.match(/^(.+).tsv/);
    if (!m) return;
    var filename = m[1];
    var text = fs.readFileSync(__dirname + '/../data/contrib/' + name, 'utf8');
    var data = JSON.stringify(parse(text), null, 2);
    console.log('write ' + filename);
    fs.writeFileSync(__dirname + '/../lib/' + filename + '.json', data);
  });
}

createJSON()
createContrib()
