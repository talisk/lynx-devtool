import { time } from "@modern-js/runtime-utils/time";
import { SERVER_TIMING, ServerTimings } from "../constants";
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
              c.header(SERVER_TIMING, value, {
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
    const getCost = time();
    await next();
    const cost = getCost();
    reporter.reportTiming(ServerTimings.SERVER_HANDLE_REQUEST, cost);
  };
}
export {
  initMonitorsPlugin,
  initReporter,
  injectServerTiming,
  injectloggerPluigin
};
