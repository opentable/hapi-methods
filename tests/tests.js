var should = require('should'),
    helper = require('../index.js'),
    cache = {
      expiryInSeconds: 60
    },
    ms = [],
    logs = [],
    serverlogs = [];

describe('tests', function(){
  var server = {
    method: function(n, m, c){
      ms.push({ m: m, c: c });
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

  it('should throw an error when the method signature is invalid', function(){
    helper.register.bind(null, server, cache, { myMethod: function(){} }).should.throw();
  });

  it('should throw an error when given something that isn\'t a function', function(){
    helper.register.bind(null, server, cache, { myMethod: 'blarg' }).should.throw();
  });

  it('should log a cachemiss', function(){
    ms[0].m(2, 2, request, function(err, res){
      logs.length.should.eql(1);
    });
  });

  it('should include the method name on the log', function(){
    logs[0].method.should.eql('myMethod');
  });

  it('should register the generateKey function', function(){
    var result = ms[0].c.generateKey(2, 2, request, function(err, res){});
    result.should.eql('251a8ad2b3294251a16936bf66f9bc747b5e9fb3');
  });
});
