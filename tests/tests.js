var should = require('should'),
    helper = require('../index.js'),
    cache = {
      expiryInSeconds: 60
    },
    ms = [],
    logs = [];

describe('tests', function(){
  var server = {
    method: function(n, m){
      ms.push(m);
    }
  },
  request = {
    log: function(t, l){
      logs.push(l);
    }
  };

  it('should register the server method', function(){
    helper.register(server, cache, {
        myMethod: function(a, b, next){
          next(null, a + b);
        }
    });

    ms.length.should.eql(1);
  });

  it('should log a cachemiss', function(){
    ms[0](2, 2, request, function(err, res){
      logs.length.should.eql(1);
    });
  });

  it('should include the method name on the log', function(){
    logs[0].method.should.eql('myMethod');
  });
});
