
var gb = require('../');

function assert(a, b) {
  if (a !== b) {
    throw new Error(a + ' is not equal to ' + b);
  }
}

function assertError(func, code) {
  var rv;
  try {
    func(code);
  } catch(e) {
    rv = e;
  }
  if (!rv) {
    throw new Error('not throw');
  }
}

describe('GB2260.get', function() {
  var gb2260 = new gb.GB2260();

  it('is a province', function() {
    var data = gb2260.get(110000);
    assert(data.name, '北京市');
    assert(data.toString(), '北京市');
    assert(data.valueOf(), data.toString());

    assert(data.inspect(), '<GB/T 2260-2014> 110000 北京市');

    var rv = data.toJSON();
    assert(rv.code, '110000');
    assert(rv.name, '北京市');
  });

  it('is a prefecture', function() {
    var data = gb2260.get(110100);
    assert(data.name, '市辖区');
    assert(data.province.name, '北京市');
    assert(data.toString(), '北京市 市辖区');
    assert(data.valueOf(), data.toString());
  });

  it('is a county', function() {
    var data = gb2260.get(110101);
    assert(data.name, '东城区');
    assert(data.province.name, '北京市');
    assert(data.prefecture.name, '市辖区');
    assert(data.toString(), '北京市 市辖区 东城区');
    assert(data.valueOf(), data.toString());
  });

  it('is null', function() {
    assert(gb2260.get(999999), null);
  });

  it('will throw invalid code length', function() {
    assertError(gb2260.get.bind(gb2260), 2207248);
    assertError(gb2260.get.bind(gb2260), 2);
  });

  it('will throw invalid province code', function() {
    assertError(gb2260.get.bind(gb2260), 99);
    assertError(gb2260.prefectures.bind(gb2260), 990000);
  });

  it('will throw invalid prefecture code', function() {
    assertError(gb2260.get.bind(gb2260), 111);
    assertError(gb2260.get.bind(gb2260), 1109);
    assertError(gb2260.counties.bind(gb2260), 999900);
  });

  it('will throw invalid county code', function() {
    assertError(gb2260.get.bind(gb2260), 11019);
  });
});

describe('GB2260 tree', function() {
  var gb2260 = new gb.GB2260();

  it('get provinces', function() {
    var data = gb2260.provinces();
    if (!data.length) {
      throw new Error('no provinces');
    }
  });

  it('get prefectures', function() {
    var data = gb2260.prefectures(110000);
    if (!data.length) {
      throw new Error('no prefectures');
    }
  });

  it('get counties', function() {
    var data = gb2260.counties(110100);
    if (!data.length) {
      throw new Error('no counties');
    }
  });

  it('can not get prefectures', function() {
    assertError(gb2260.prefectures.bind(gb2260), 123);
    assertError(gb2260.prefectures.bind(gb2260), 99);
  });

  it('can not get prefectures with invalid code', function() {
    assertError(gb2260.prefectures.bind(gb2260), 9);
  });

  it('can not get counties', function() {
    assertError(gb2260.counties.bind(gb2260), 1109);
    assertError(gb2260.counties.bind(gb2260), 119);
    assertError(gb2260.counties.bind(gb2260), 9909);
  });

  it('can not get counties with invalid code', function() {
    assertError(gb2260.counties.bind(gb2260), 9);
  });
});

describe('for coverage', function() {
  it('can accept data', function() {
    var data = require('../lib/2014');
    new gb.GB2260(2014, data);
  });

  it('can has no revision', function() {
    var div = new gb.Division({code: 12, name: 'GB'});
    assert(div.inspect(), '<GB/T 2260> 12 GB');
  });
});
