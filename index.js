var _ = require('underscore'),
    sha = require("sha1");

exports.register = function(server, cache, methods){
  Object.keys(methods)
  .forEach(function(v){
    var method = methods[v];
    if(!method || (typeof method !== "function") ||  method.length < 2){
      throw new Error("arguments list did not match (arg1, .... argN, next)");
    }

    server.method(v, function(){ /* (arg1, ...., argN, request, next) */
        var request = arguments[arguments.length-2];
        request.log(["cachemiss"], { method: v });

        var args = _.take(arguments, arguments.length-2);
        args.push(_.last(arguments));
        method.apply(this, args);
      }, {
      cache: cache,
      generateKey: function() {
        var args = _.take(arguments, arguments.length-1);
        var key = sha(JSON.stringify(args));

        return key;
      }
    });
  });
};
