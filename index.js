var _ = require('underscore'),
    sha = require("sha1");

exports.register = function(server, cache, methods){
  Object.keys(methods)
  .forEach(function(v){
    server.method(v, function(){
        arguments[arguments.length-2].log(["cachemiss"], { method: v });
        var args = _.take(arguments, arguments.length-2);
        args.push(_.last(arguments))
        methods[v].apply(this, args);
      }, {
      cache: cache,
      generateKey: function() {
        var args = _.take(arguments, arguments.length-2);
        var sha = sha(JSON.stringify(args));
        server.log(["key-generate"], { args: args, key: sha });
        return sha;
      }
    });
  });
};
