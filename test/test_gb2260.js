
var gb = require('../');

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
      assert(data.valueOf(), data.toString());

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
      assert(data.valueOf(), data.toString());

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
      assert(data.valueOf(), data.toString());

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

describe('other', function() {
  it('is not different between two years', function() {
    var data = new gb.Division(220724);
    assert(data.inspect(), '<GB/T 2260> 吉林省 松原市');
    assert(data.valid(), false);

    data = new gb.Division(220724, 2012);
    assert(data.inspect(), '<GB/T 2260-2012> 吉林省 松原市 扶余县');
    assert(data.valid(), true);
  });

  it('is not valid', function() {
    var data = new gb.Division(1000000);
    assert(data.valid(), false);
    data = new gb.Division(1001000);
    assert(data.valid(), false);
  });

  it('will throw', function() {
    var rv;
    try {
      new gb.Division(220724, 2005);
    } catch (e) {
      rv = e;
    }
    if (!rv) {
      throw new Error('not throw');
    }
  });

  it('has keys', function() {
    var keys = Object.keys(gb.data);
    if (keys.indexOf('2012') === -1) {
      throw new Error('2012 not in keys');
    }
  });
});
