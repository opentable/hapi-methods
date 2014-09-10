var should = require('should'),
    helper = require('../index.js'),
    cache = {
      expiryInSeconds: 60
    },
    ms = [];

describe('tests', function(){
  var server = {
    method: function(m){
      ms.push(m);
    }
  };
  
  it('should register the server method', function(){
    helper.register(server, cache, {
        myMethod: function(a, b, request, next){
          next(null, a + b);
        }
    });

    ms.length.should.eql(1);
  });
});
