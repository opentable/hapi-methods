var _ = require('underscore');

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
        return JSON.stringify(_.take(arguments, arguments.length-2));
      }
    });
  });
};
