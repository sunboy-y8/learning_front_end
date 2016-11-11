
//写单元测试的js文件

var should = chai.should();
describe('simple test', function () {
  it('should equal 1 when n === 2', function () {
    window.fibonacci(2).should.equal(1);
  });
});

describe('simple test', function () {
  it('should equal 1 when n === 2', function () {
    window.fibonacci(1).should.equal(1);
  });
});

describe('simple test', function () {
  it('should equal 1 when n === 2', function () {
    window.fibonacci(0).should.equal(0);
  });
});