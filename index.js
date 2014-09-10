var _ = require('underscore');

exports.register = function(server, cache, methods){
  Object.keys(methods)
  .forEach(function(v){
    server.method(v, methods[v], {
      cache: cache.server,
      generateKey: function() {
        return JSON.stringify(_.take(arguments, arguments.length-2));
      }
    });
  });
};
