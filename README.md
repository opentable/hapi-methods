Server methods helper for hapi
---

My narrow helper for server-methods, use it, or don't.

```
var catbox-redis = require("catbox-redis");
var server = require('hapi').createServer('127.0.0.1', 3000, {
  cache: {
        engine: require("catbox-redis"),
        host: 127.0.0.1
    }
});
var methods = require('hapi-methods');
var config = {
  expiryInSeconds: 60
};

var methods = {
  add: function(a, b, request, next){
    // when the server method itself is called, we can log the cache-miss
    request.log(["cachemiss"], { method: "add" });
    next(null, a+b);
  }
};

methods.register(server, config, methods); 

server.route({
    method: 'GET',
    path: '/add/{one}/{two}'
    handler: function(req, res){
      req.server.methods.add(req.params.one, req.params.two, req, function(err, result){
        if(err){
          reply(err);
        }

        reply(result);
      });
    }
});

server.start(function(){
  console.log('server started...');
});

```
