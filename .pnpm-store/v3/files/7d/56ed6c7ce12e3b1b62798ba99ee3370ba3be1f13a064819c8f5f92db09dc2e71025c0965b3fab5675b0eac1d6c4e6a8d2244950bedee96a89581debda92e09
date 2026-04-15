import path from "path";
import { fileReader } from "@modern-js/runtime-utils/fileReader";
import { fs } from "@modern-js/utils";
import { getMimeType } from "hono/utils/mime";
import { sortRoutes } from "../../../utils";
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
      const filename = path.join(pwd, entryPath);
      const data = await fileReader.readFile(filename, "buffer");
      const mimeType = getMimeType(filename);
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
  for (const route of routes.sort(sortRoutes)) {
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
      const filepath = path.join(pwd, pathname.replace(prefix, () => ""));
      if (!await fs.pathExists(filepath)) {
        return next();
      }
      const mimeType = getMimeType(filepath);
      if (mimeType) {
        c.header("Content-Type", mimeType);
      }
      const stat = await fs.lstat(filepath);
      const { size } = stat;
      const chunk = await fileReader.readFile(filepath, "buffer");
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
export {
  createPublicMiddleware,
  createStaticMiddleware,
  serverStaticPlugin
};
