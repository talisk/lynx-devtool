import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
var processedByPlugin = function() {
  return {
    name: "@modern-js/plugin-processed",
    setup: function setup(api) {
      return {
        prepare: function prepare() {
          var middlewares = api.useAppContext().middlewares;
          middlewares.push({
            name: "processed-by",
            handler: function() {
              var _ref = _async_to_generator(function(c, next) {
                return _ts_generator(this, function(_state) {
                  switch (_state.label) {
                    case 0:
                      return [
                        4,
                        next()
                      ];
                    case 1:
                      _state.sent();
                      c.header("X-Processed-By", "Modern.js");
                      return [
                        2
                      ];
                  }
                });
              });
              return function(c, next) {
                return _ref.apply(this, arguments);
              };
            }()
          });
        }
      };
    }
  };
};
export {
  processedByPlugin
};
