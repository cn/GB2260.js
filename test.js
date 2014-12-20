
var gb = require('./');

function assert(a, b) {
  if (a !== b) {
    throw new Error(a + ' is not equal to ' + b);
  }
}

function suite(year) {
  describe(year, function() {

    it('is a province', function() {
      var data = new gb.Division(110000, year);
      assert(data.province, '北京市');
      assert(data.toString(), '北京市');

      var rv = data.toJSON();
      assert(rv.province, data.province);
      assert(rv.prefecture, data.prefecture);
      assert(rv.county, data.county);
    });

    it('is a prefecture', function() {
      var data = new gb.Division(110100, year);
      assert(data.province, '北京市');
      assert(data.prefecture, '市辖区');
      assert(data.toString(), '北京市 市辖区');

      var rv = data.toJSON();
      assert(rv.province, data.province);
      assert(rv.prefecture, data.prefecture);
      assert(rv.county, data.county);
    });

    it('is a county', function() {
      var data = new gb.Division(110101, year);
      assert(data.province, '北京市');
      assert(data.prefecture, '市辖区');
      assert(data.county, '东城区');
      assert(data.toString(), '北京市 市辖区 东城区');

      var rv = data.toJSON();
      assert(rv.province, data.province);
      assert(rv.prefecture, data.prefecture);
      assert(rv.county, data.county);
    });
  });
}

var current = 2013;
var MIN = 2006;

while (current >= MIN) {
  suite(current);
  current = current - 1;
}
