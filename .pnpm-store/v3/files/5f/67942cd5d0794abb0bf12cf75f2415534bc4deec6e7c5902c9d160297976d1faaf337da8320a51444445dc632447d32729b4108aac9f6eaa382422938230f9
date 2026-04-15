import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { applyPlugins } from "@modern-js/prod-server";
import { createDevServer } from "@modern-js/server";
var server = null;
var getServer = function() {
  return server;
};
var setServer = function(newServer) {
  server = newServer;
};
var closeServer = function() {
  var _ref = _async_to_generator(function() {
    return _ts_generator(this, function(_state) {
      if (server) {
        server.close();
        server = null;
      }
      return [
        2
      ];
    });
  });
  return function closeServer2() {
    return _ref.apply(this, arguments);
  };
}();
var createServer = function() {
  var _ref = _async_to_generator(function(options) {
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          if (server) {
            server.close();
          }
          return [
            4,
            createDevServer(options, applyPlugins)
          ];
        case 1:
          server = _state.sent().server;
          return [
            2,
            server
          ];
      }
    });
  });
  return function createServer2(options) {
    return _ref.apply(this, arguments);
  };
}();
export {
  closeServer,
  createServer,
  getServer,
  setServer
};
