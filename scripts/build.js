var fs = require('fs')

var header = [
  "var gb2260 = {};",
  "(function(exports) {\n",
].join('\n')

var footer = '\n})(gb2260);\n'


var code = fs.readFileSync('lib/index.js', 'utf8')

var revisions = fs.readFileSync('lib/revisions.json', 'utf8')
code = code.replace("require('./revisions')", revisions)

code = code.replace("require('./' + revision + '.json')", "DATABASE[revision]")

code = code.replace('var REVISIONS', 'var DATABASE = {};\n\nvar REVISIONS')
code += '\nexports.register = function(revision, data) {\n  DATABASE[revision] = data;\n}\n'

fs.writeFileSync('dist/gb2260.js', header + code + footer)
