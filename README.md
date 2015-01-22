#hapi-methods
[![Build Status](https://travis-ci.org/opentable/hapi-methods.png?branch=master)](https://travis-ci.org/opentable/hapi-methods) [![NPM version](https://badge.fury.io/js/hapi-methods.png)](http://badge.fury.io/js/hapi-methods) ![Dependencies](https://david-dm.org/opentable/hapi-methods.png)


My narrow helper for server-methods, use it, or don't. Assumes that you are caching your method results.

Benefits:
 - does a request.log(["cachemiss"], ...) so you can track the hit/miss ratio
 - generates a sha1 key instead of stringifying the input args (useful if you have large input objects)
 - what more do you need?

```
var catbox-redis = require("catbox-redis");
var Hapi = require("hapi");
var server = new Hapi.Server({
  cache: {
        engine: require("catbox-redis"),
        host: 127.0.0.1
    }
});

server.connection({ port: 3000 });

var methods = require("hapi-methods");
var config = {
  expiryInSeconds: 60
};

var methods = {
  add: function(a, b, next){
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
