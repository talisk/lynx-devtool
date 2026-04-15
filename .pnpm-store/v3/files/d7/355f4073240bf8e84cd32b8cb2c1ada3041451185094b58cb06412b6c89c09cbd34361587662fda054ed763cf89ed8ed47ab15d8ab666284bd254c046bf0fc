import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { fileReader } from "@modern-js/runtime-utils/fileReader";
import { fs } from "@modern-js/utils";
import { getMimeType } from "hono/utils/mime";
import { sortRoutes } from "../../../utils";
var serverStaticPlugin = function() {
  return {
    name: "@modern-js/plugin-server-static",
    setup: function setup(api) {
      return {
        prepare: function prepare() {
          var _api_useAppContext = api.useAppContext(), middlewares = _api_useAppContext.middlewares, pwd = _api_useAppContext.distDirectory, routes = _api_useAppContext.routes;
          var config = api.useConfigContext();
          var serverStaticMiddleware = createStaticMiddleware({
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
  };
};
function createPublicMiddleware(param) {
  var pwd = param.pwd, routes = param.routes;
  return function() {
    var _ref = _async_to_generator(function(c, next) {
      var route, entryPath, filename, data, mimeType;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            route = matchRoute(c.req, routes);
            if (!route)
              return [
                3,
                2
              ];
            entryPath = route.entryPath;
            filename = path.join(pwd, entryPath);
            return [
              4,
              fileReader.readFile(filename, "buffer")
            ];
          case 1:
            data = _state.sent();
            mimeType = getMimeType(filename);
            if (data !== null) {
              if (mimeType) {
                c.header("Content-Type", mimeType);
              }
              Object.entries(route.responseHeaders || {}).forEach(function(param2) {
                var _param = _sliced_to_array(param2, 2), k = _param[0], v = _param[1];
                c.header(k, v);
              });
              return [
                2,
                c.body(data, 200)
              ];
            }
            _state.label = 2;
          case 2:
            return [
              4,
              next()
            ];
          case 3:
            return [
              2,
              _state.sent()
            ];
        }
      });
    });
    return function(c, next) {
      return _ref.apply(this, arguments);
    };
  }();
}
function matchRoute(req, routes) {
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = routes.sort(sortRoutes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;
      if (!route.isSSR && route.entryPath.startsWith("public") && req.path.startsWith(route.urlPath)) {
        return route;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return void 0;
}
function createStaticMiddleware(options) {
  var pwd = options.pwd, routes = options.routes;
  var prefix = options.output.assetPrefix || "/";
  var _options_output = options.output, tmp = _options_output.distPath, _ref = tmp === void 0 ? {} : tmp, cssPath = _ref.css, jsPath = _ref.js, mediaPath = _ref.media;
  var _options_html = options.html, favicon = _options_html.favicon, faviconByEntries = _options_html.faviconByEntries;
  var favicons = prepareFavicons(favicon, faviconByEntries);
  var staticFiles = [
    cssPath,
    jsPath,
    mediaPath
  ].filter(function(v) {
    return Boolean(v);
  });
  var staticReg = [
    "static/",
    "upload/"
  ].concat(_to_consumable_array(staticFiles));
  var iconReg = [
    "favicon.ico",
    "icon.png"
  ].concat(_to_consumable_array(favicons));
  var regPrefix = prefix.endsWith("/") ? prefix : "".concat(prefix, "/");
  var staticPathRegExp = new RegExp("^".concat(regPrefix, "(").concat(_to_consumable_array(staticReg).concat(_to_consumable_array(iconReg)).join("|"), ")"));
  return function() {
    var _ref2 = _async_to_generator(function(c, next) {
      var pathname, hit, filepath, mimeType, stat, size, chunk;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            pathname = c.req.path;
            hit = staticPathRegExp.test(pathname);
            if (!hit)
              return [
                3,
                4
              ];
            filepath = path.join(pwd, pathname.replace(prefix, function() {
              return "";
            }));
            return [
              4,
              fs.pathExists(filepath)
            ];
          case 1:
            if (!_state.sent()) {
              return [
                2,
                next()
              ];
            }
            mimeType = getMimeType(filepath);
            if (mimeType) {
              c.header("Content-Type", mimeType);
            }
            return [
              4,
              fs.lstat(filepath)
            ];
          case 2:
            stat = _state.sent();
            size = stat.size;
            return [
              4,
              fileReader.readFile(filepath, "buffer")
            ];
          case 3:
            chunk = _state.sent();
            c.header("Content-Length", String(size));
            return [
              2,
              c.body(chunk, 200)
            ];
          case 4:
            return [
              2,
              createPublicMiddleware({
                pwd,
                routes: routes || []
              })(c, next)
            ];
          case 5:
            return [
              2
            ];
        }
      });
    });
    return function(c, next) {
      return _ref2.apply(this, arguments);
    };
  }();
}
var prepareFavicons = function(favicon, faviconByEntries) {
  var faviconNames = [];
  if (favicon && typeof favicon === "string") {
    faviconNames.push(favicon.substring(favicon.lastIndexOf("/") + 1));
  }
  if (faviconByEntries) {
    Object.keys(faviconByEntries).forEach(function(f) {
      var curFavicon = faviconByEntries[f];
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
