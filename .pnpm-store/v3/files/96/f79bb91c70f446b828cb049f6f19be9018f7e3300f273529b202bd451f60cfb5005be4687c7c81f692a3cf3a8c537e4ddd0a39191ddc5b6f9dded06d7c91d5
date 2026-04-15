const AGGRED_DIR = {
  mock: "config/mock",
  server: "server",
  api: "api",
  shared: "shared",
  lambda: "lambda"
};
const REPLACE_REG = {
  before: {
    head: "<head\\b[^>]*>",
    body: "<body\\b[^>]*>"
  },
  after: {
    head: "</head>",
    body: "</body>"
  }
};
var ServerTimings;
(function(ServerTimings2) {
  ServerTimings2["SERVER_HANDLE_REQUEST"] = "server-handle-request";
  ServerTimings2["SERVER_MIDDLEWARE"] = "server-middleware";
  ServerTimings2["SERVER_HOOK_AFTER_RENDER"] = "server-hook-after-render";
  ServerTimings2["SERVER_HOOK_AFTER_MATCH"] = "server-hook-after-match";
})(ServerTimings || (ServerTimings = {}));
const SERVER_TIMING = "Server-Timing";
const X_RENDER_CACHE = "x-render-cache";
const X_MODERNJS_RENDER = "x-modernjs-render";
export {
  AGGRED_DIR,
  REPLACE_REG,
  SERVER_TIMING,
  ServerTimings,
  X_MODERNJS_RENDER,
  X_RENDER_CACHE
};
