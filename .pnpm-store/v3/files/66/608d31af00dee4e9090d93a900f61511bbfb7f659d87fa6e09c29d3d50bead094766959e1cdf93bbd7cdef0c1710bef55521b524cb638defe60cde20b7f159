import { getPathname } from "../utils";
var LogPrefix;
(function(LogPrefix2) {
  LogPrefix2["Outgoing"] = "-->";
  LogPrefix2["Incoming"] = "<--";
  LogPrefix2["Error"] = "xxx";
})(LogPrefix || (LogPrefix = {}));
const humanize = (times) => {
  const [delimiter, separator] = [
    ",",
    "."
  ];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${delimiter}`));
  return orderTimes.join(separator);
};
const time = (start) => {
  const delta = Date.now() - start;
  return humanize([
    delta < 1e3 ? `${delta}ms` : `${Math.round(delta / 1e3)}s`
  ]);
};
const colorStatus = (status) => {
  const out = {
    7: `\x1B[35m${status}\x1B[0m`,
    5: `\x1B[31m${status}\x1B[0m`,
    4: `\x1B[33m${status}\x1B[0m`,
    3: `\x1B[36m${status}\x1B[0m`,
    2: `\x1B[32m${status}\x1B[0m`,
    1: `\x1B[32m${status}\x1B[0m`,
    0: `\x1B[33m${status}\x1B[0m`
  };
  const calculateStatus = Math.floor(status / 100);
  return out[calculateStatus];
};
function log(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `  ${prefix} ${method} ${path}` : `  ${prefix} ${method} ${path} ${colorStatus(status)} ${elapsed}`;
  fn(out);
}
function logHandler() {
  return async function logger(c, next) {
    const { method } = c.req;
    const monitors = c.get("monitors");
    if (!monitors) {
      await next();
      return;
    }
    const path = getPathname(c.req.raw);
    const logFn = monitors.debug;
    log(logFn, "<--", method, path);
    const start = Date.now();
    await next();
    log(logFn, "-->", method, path, c.res.status, time(start));
  };
}
const logPlugin = () => ({
  name: "@modern-js/plugin-log",
  setup(api) {
    return {
      prepare() {
        const { middlewares } = api.useAppContext();
        middlewares.push({
          name: "print_log",
          handler: logHandler()
        });
      }
    };
  }
});
export {
  logPlugin
};
