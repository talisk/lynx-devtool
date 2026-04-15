import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { time } from "@modern-js/runtime-utils/time";
import { SERVER_TIMING, ServerTimings } from "../constants";
function createMonitors() {
  var coreMonitors = [];
  var log = function(level, message, args) {
    var event = {
      type: "log",
      payload: {
        level,
        message,
        args
      }
    };
    coreMonitors.forEach(function(monitor) {
      return monitor(event);
    });
  };
  var mointors = {
    push: function push(monitor) {
      coreMonitors.push(monitor);
    },
    error: function error(message) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      log("error", message, args);
    },
    warn: function warn(message) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      log("warn", message, args);
    },
    debug: function debug(message) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      log("debug", message, args);
    },
    info: function info(message) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      log("info", message, args);
    },
    timing: function timing(name, dur, desc) {
      var event = {
        type: "timing",
        payload: {
          name,
          dur,
          desc
        }
      };
      coreMonitors.forEach(function(monitor) {
        return monitor(event);
      });
    }
  };
  return mointors;
}
var initMonitorsPlugin = function() {
  return {
    name: "@modern-js/init-mointor",
    setup: function setup(api) {
      return {
        prepare: function prepare() {
          var middlewares = api.useAppContext().middlewares;
          middlewares.push({
            name: "init-monitor",
            handler: function() {
              var _ref = _async_to_generator(function(c, next) {
                var monitors;
                return _ts_generator(this, function(_state) {
                  if (!c.get("monitors")) {
                    monitors = createMonitors();
                    c.set("monitors", monitors);
                  }
                  return [
                    2,
                    next()
                  ];
                });
              });
              return function(c, next) {
                return _ref.apply(this, arguments);
              };
            }(),
            order: "pre"
          });
        }
      };
    }
  };
};
var injectloggerPluigin = function(inputLogger) {
  return {
    name: "@modern-js/inject-logger",
    setup: function setup(api) {
      var logger = inputLogger || console;
      return {
        prepare: function prepare() {
          var middlewares = api.useAppContext().middlewares;
          middlewares.push({
            name: "inject-logger",
            handler: function() {
              var _ref = _async_to_generator(function(c, next) {
                var pathname, loggerMonitor, monitors;
                return _ts_generator(this, function(_state) {
                  if (!c.get("logger")) {
                    c.set("logger", logger);
                  }
                  pathname = c.req.path;
                  loggerMonitor = function(event) {
                    if (event.type === "log") {
                      var _logger;
                      var _event_payload = event.payload, level = _event_payload.level, message = _event_payload.message, args = _event_payload.args;
                      (_logger = logger)[level].apply(_logger, [
                        message
                      ].concat(_to_consumable_array(args || [])));
                    }
                    if (event.type === "timing") {
                      var _event_payload1 = event.payload, name = _event_payload1.name, dur = _event_payload1.dur, desc = _event_payload1.desc;
                      if (desc) {
                        logger.debug("%s Debug - ".concat(name, ", cost: %s, req.url = %s "), desc, dur, pathname);
                      } else {
                        logger.debug("Debug - ".concat(name, ", cost: %s, req.url = %s"), dur, pathname);
                      }
                    }
                  };
                  monitors = c.get("monitors");
                  monitors === null || monitors === void 0 ? void 0 : monitors.push(loggerMonitor);
                  return [
                    2,
                    next()
                  ];
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
var injectServerTiming = function() {
  return {
    name: "@modern-js/inject-server-timing",
    setup: function setup(api) {
      return {
        prepare: function prepare() {
          var _api_useAppContext = api.useAppContext(), middlewares = _api_useAppContext.middlewares, metaName = _api_useAppContext.metaName;
          middlewares.push({
            name: "inject-server-timing",
            handler: function() {
              var _ref = _async_to_generator(function(c, next) {
                var serverTimings, timingMonitor, monitors;
                return _ts_generator(this, function(_state) {
                  switch (_state.label) {
                    case 0:
                      serverTimings = [];
                      timingMonitor = function(event) {
                        if (event.type === "timing") {
                          serverTimings.push(event.payload);
                        }
                      };
                      monitors = c.get("monitors");
                      monitors === null || monitors === void 0 ? void 0 : monitors.push(timingMonitor);
                      return [
                        4,
                        next()
                      ];
                    case 1:
                      _state.sent();
                      serverTimings.forEach(function(serverTiming) {
                        var name = serverTiming.name, desc = serverTiming.desc, dur = serverTiming.dur;
                        var _name = "bd-".concat(metaName, "-").concat(name);
                        var value = "".concat(_name, ";").concat(desc ? 'decs="'.concat(desc, '";') : "", " dur=").concat(dur);
                        c.header(SERVER_TIMING, value, {
                          append: true
                        });
                      });
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
function initReporter(entryName) {
  return function() {
    var _ref = _async_to_generator(function(c, next) {
      var reporter, getCost, cost;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            reporter = c.get("reporter");
            if (!!reporter)
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
            return [
              4,
              reporter.init({
                entryName
              })
            ];
          case 3:
            _state.sent();
            getCost = time();
            return [
              4,
              next()
            ];
          case 4:
            _state.sent();
            cost = getCost();
            reporter.reportTiming(ServerTimings.SERVER_HANDLE_REQUEST, cost);
            return [
              2
            ];
        }
      });
    });
    return function(c, next) {
      return _ref.apply(this, arguments);
    };
  }();
}
export {
  initMonitorsPlugin,
  initReporter,
  injectServerTiming,
  injectloggerPluigin
};
