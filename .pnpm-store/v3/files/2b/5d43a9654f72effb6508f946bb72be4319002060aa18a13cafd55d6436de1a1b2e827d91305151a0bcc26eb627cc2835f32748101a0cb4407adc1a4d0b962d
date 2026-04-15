"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var monitors_exports = {};
__export(monitors_exports, {
  initMonitorsPlugin: () => initMonitorsPlugin,
  initReporter: () => initReporter,
  injectServerTiming: () => injectServerTiming,
  injectloggerPluigin: () => injectloggerPluigin
});
module.exports = __toCommonJS(monitors_exports);
var import_time = require("@modern-js/runtime-utils/time");
var import_constants = require("../constants");
function createMonitors() {
  const coreMonitors = [];
  const log = (level, message, args) => {
    const event = {
      type: "log",
      payload: {
        level,
        message,
        args
      }
    };
    coreMonitors.forEach((monitor) => monitor(event));
  };
  const mointors = {
    push(monitor) {
      coreMonitors.push(monitor);
    },
    error(message, ...args) {
      log("error", message, args);
    },
    warn(message, ...args) {
      log("warn", message, args);
    },
    debug(message, ...args) {
      log("debug", message, args);
    },
    info(message, ...args) {
      log("info", message, args);
    },
    timing(name, dur, desc) {
      const event = {
        type: "timing",
        payload: {
          name,
          dur,
          desc
        }
      };
      coreMonitors.forEach((monitor) => monitor(event));
    }
  };
  return mointors;
}
const initMonitorsPlugin = () => ({
  name: "@modern-js/init-mointor",
  setup(api) {
    return {
      prepare() {
        const { middlewares } = api.useAppContext();
        middlewares.push({
          name: "init-monitor",
          handler: async (c, next) => {
            if (!c.get("monitors")) {
              const monitors = createMonitors();
              c.set("monitors", monitors);
            }
            return next();
          },
          order: "pre"
        });
      }
    };
  }
});
const injectloggerPluigin = (inputLogger) => ({
  name: "@modern-js/inject-logger",
  setup(api) {
    const logger = inputLogger || console;
    return {
      prepare() {
        const { middlewares } = api.useAppContext();
        middlewares.push({
          name: "inject-logger",
          handler: async (c, next) => {
            if (!c.get("logger")) {
              c.set("logger", logger);
            }
            const pathname = c.req.path;
            const loggerMonitor = (event) => {
              if (event.type === "log") {
                const { level, message, args } = event.payload;
                logger[level](message, ...args || []);
              }
              if (event.type === "timing") {
                const { name, dur, desc } = event.payload;
                if (desc) {
                  logger.debug(`%s Debug - ${name}, cost: %s, req.url = %s `, desc, dur, pathname);
                } else {
                  logger.debug(`Debug - ${name}, cost: %s, req.url = %s`, dur, pathname);
                }
              }
            };
            const monitors = c.get("monitors");
            monitors === null || monitors === void 0 ? void 0 : monitors.push(loggerMonitor);
            return next();
          }
        });
      }
    };
  }
});
const injectServerTiming = () => ({
  name: "@modern-js/inject-server-timing",
  setup(api) {
    return {
      prepare() {
        const { middlewares, metaName } = api.useAppContext();
        middlewares.push({
          name: "inject-server-timing",
          handler: async (c, next) => {
            const serverTimings = [];
            const timingMonitor = (event) => {
              if (event.type === "timing") {
                serverTimings.push(event.payload);
              }
            };
            const monitors = c.get("monitors");
            monitors === null || monitors === void 0 ? void 0 : monitors.push(timingMonitor);
            await next();
            serverTimings.forEach((serverTiming) => {
              const { name, desc, dur } = serverTiming;
              const _name = `bd-${metaName}-${name}`;
              const value = `${_name};${desc ? `decs="${desc}";` : ""} dur=${dur}`;
              c.header(import_constants.SERVER_TIMING, value, {
                append: true
              });
            });
          }
        });
      }
    };
  }
});
function initReporter(entryName) {
  return async (c, next) => {
    const reporter = c.get("reporter");
    if (!reporter) {
      await next();
      return;
    }
    await reporter.init({
      entryName
    });
    const getCost = (0, import_time.time)();
    await next();
    const cost = getCost();
    reporter.reportTiming(import_constants.ServerTimings.SERVER_HANDLE_REQUEST, cost);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initMonitorsPlugin,
  initReporter,
  injectServerTiming,
  injectloggerPluigin
});
