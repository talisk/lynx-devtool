import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
var faviconPlugin = function() {
  return {
    name: "@modern-js/plugin-favicon",
    setup: function setup(api) {
      return {
        prepare: function prepare() {
          var middlewares = api.useAppContext().middlewares;
          middlewares.push({
            name: "favicon-fallback",
            path: "/favicon.ico",
            handler: function() {
              var _ref = _async_to_generator(function(c, _next) {
                return _ts_generator(this, function(_state) {
                  return [
                    2,
                    c.body(null, 204)
                  ];
                });
              });
              return function(c, _next) {
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
  faviconPlugin
};
