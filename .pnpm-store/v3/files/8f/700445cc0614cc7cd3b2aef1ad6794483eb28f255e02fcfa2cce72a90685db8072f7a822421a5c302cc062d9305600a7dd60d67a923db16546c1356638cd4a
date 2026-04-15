"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var static_exports = {};
__export(static_exports, {
  createPublicMiddleware: () => createPublicMiddleware,
  createStaticMiddleware: () => createStaticMiddleware,
  serverStaticPlugin: () => serverStaticPlugin
});
module.exports = __toCommonJS(static_exports);
var import_path = __toESM(require("path"));
var import_fileReader = require("@modern-js/runtime-utils/fileReader");
var import_utils = require("@modern-js/utils");
var import_mime = require("hono/utils/mime");
var import_utils2 = require("../../../utils");
const serverStaticPlugin = () => ({
  name: "@modern-js/plugin-server-static",
  setup(api) {
    return {
      prepare() {
        const { middlewares, distDirectory: pwd, routes } = api.useAppContext();
        const config = api.useConfigContext();
        const serverStaticMiddleware = createStaticMiddleware({
          pwd,
          routes,
          output: config.output || {},
          html: config.html || {}
        });
        middlewares.push({
          name: "server-static",
          handler: serverStaticMiddleware
        });
      }
    };
  }
});
function createPublicMiddleware({ pwd, routes }) {
  return async (c, next) => {
    const route = matchRoute(c.req, routes);
    if (route) {
      const { entryPath } = route;
      const filename = import_path.default.join(pwd, entryPath);
      const data = await import_fileReader.fileReader.readFile(filename, "buffer");
      const mimeType = (0, import_mime.getMimeType)(filename);
      if (data !== null) {
        if (mimeType) {
          c.header("Content-Type", mimeType);
        }
        Object.entries(route.responseHeaders || {}).forEach(([k, v]) => {
          c.header(k, v);
        });
        return c.body(data, 200);
      }
    }
    return await next();
  };
}
function matchRoute(req, routes) {
  for (const route of routes.sort(import_utils2.sortRoutes)) {
    if (!route.isSSR && route.entryPath.startsWith("public") && req.path.startsWith(route.urlPath)) {
      return route;
    }
  }
  return void 0;
}
function createStaticMiddleware(options) {
  const { pwd, routes } = options;
  const prefix = options.output.assetPrefix || "/";
  const { distPath: { css: cssPath, js: jsPath, media: mediaPath } = {} } = options.output;
  const { favicon, faviconByEntries } = options.html;
  const favicons = prepareFavicons(favicon, faviconByEntries);
  const staticFiles = [
    cssPath,
    jsPath,
    mediaPath
  ].filter((v) => Boolean(v));
  const staticReg = [
    "static/",
    "upload/",
    ...staticFiles
  ];
  const iconReg = [
    "favicon.ico",
    "icon.png",
    ...favicons
  ];
  const regPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
  const staticPathRegExp = new RegExp(`^${regPrefix}(${[
    ...staticReg,
    ...iconReg
  ].join("|")})`);
  return async (c, next) => {
    const pathname = c.req.path;
    const hit = staticPathRegExp.test(pathname);
    if (hit) {
      const filepath = import_path.default.join(pwd, pathname.replace(prefix, () => ""));
      if (!await import_utils.fs.pathExists(filepath)) {
        return next();
      }
      const mimeType = (0, import_mime.getMimeType)(filepath);
      if (mimeType) {
        c.header("Content-Type", mimeType);
      }
      const stat = await import_utils.fs.lstat(filepath);
      const { size } = stat;
      const chunk = await import_fileReader.fileReader.readFile(filepath, "buffer");
      c.header("Content-Length", String(size));
      return c.body(chunk, 200);
    } else {
      return createPublicMiddleware({
        pwd,
        routes: routes || []
      })(c, next);
    }
  };
}
const prepareFavicons = (favicon, faviconByEntries) => {
  const faviconNames = [];
  if (favicon && typeof favicon === "string") {
    faviconNames.push(favicon.substring(favicon.lastIndexOf("/") + 1));
  }
  if (faviconByEntries) {
    Object.keys(faviconByEntries).forEach((f) => {
      const curFavicon = faviconByEntries[f];
      if (curFavicon) {
        faviconNames.push(curFavicon.substring(curFavicon.lastIndexOf("/") + 1));
      }
    });
  }
  return faviconNames;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPublicMiddleware,
  createStaticMiddleware,
  serverStaticPlugin
});
