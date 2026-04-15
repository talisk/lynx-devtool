import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { getPathname } from "../utils";
var LogPrefix;
(function(LogPrefix2) {
  LogPrefix2["Outgoing"] = "-->";
  LogPrefix2["Incoming"] = "<--";
  LogPrefix2["Error"] = "xxx";
})(LogPrefix || (LogPrefix = {}));
var humanize = function(times) {
  var delimiter = ",", separator = ".";
  var orderTimes = times.map(function(v) {
    return v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1".concat(delimiter));
  });
  return orderTimes.join(separator);
};
var time = function(start) {
  var delta = Date.now() - start;
  return humanize([
    delta < 1e3 ? "".concat(delta, "ms") : "".concat(Math.round(delta / 1e3), "s")
  ]);
};
var colorStatus = function(status) {
  var out = {
    7: "\x1B[35m".concat(status, "\x1B[0m"),
    5: "\x1B[31m".concat(status, "\x1B[0m"),
    4: "\x1B[33m".concat(status, "\x1B[0m"),
    3: "\x1B[36m".concat(status, "\x1B[0m"),
    2: "\x1B[32m".concat(status, "\x1B[0m"),
    1: "\x1B[32m".concat(status, "\x1B[0m"),
    0: "\x1B[33m".concat(status, "\x1B[0m")
  };
  var calculateStatus = Math.floor(status / 100);
  return out[calculateStatus];
};
function log(fn, prefix, method, path) {
  var status = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, elapsed = arguments.length > 5 ? arguments[5] : void 0;
  var out = prefix === "<--" ? "  ".concat(prefix, " ").concat(method, " ").concat(path) : "  ".concat(prefix, " ").concat(method, " ").concat(path, " ").concat(colorStatus(status), " ").concat(elapsed);
  fn(out);
}
function logHandler() {
  return function() {
    var _logger = _async_to_generator(function(c, next) {
      var method, monitors, path, logFn, start;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            method = c.req.method;
            monitors = c.get("monitors");
            if (!!monitors)
              return [
                3,
                2
              ];
            return [
              4,
              next()
            ];
          case 1:
            _state.sent();
            return [
              2
            ];
          case 2:
            path = getPathname(c.req.raw);
            logFn = monitors.debug;
            log(logFn, "<--", method, path);
            start = Date.now();
            return [
              4,
              next()
            ];
          case 3:
            _state.sent();
            log(logFn, "-->", method, path, c.res.status, time(start));
            return [
              2
            ];
        }
      });
    });
    function logger(c, next) {
      return _logger.apply(this, arguments);
    }
    return logger;
  }();
}
var logPlugin = function() {
  return {
    name: "@modern-js/plugin-log",
    setup: function setup(api) {
      return {
        prepare: function prepare() {
          var middlewares = api.useAppContext().middlewares;
          middlewares.push({
            name: "print_log",
            handler: logHandler()
          });
        }
      };
    }
  };
};
export {
  logPlugin
};
