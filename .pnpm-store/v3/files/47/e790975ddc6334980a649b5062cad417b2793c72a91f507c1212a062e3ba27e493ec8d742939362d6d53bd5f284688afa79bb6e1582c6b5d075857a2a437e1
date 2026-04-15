import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import fs from "fs";
import path from "path";
import { JS_EXTENSIONS, fs as fse, normalizeToPosixPath } from "@modern-js/utils";
import { parse } from "es-module-lexer";
import { transform } from "esbuild";
import { ACTION_EXPORT_NAME, LOADER_EXPORT_NAME } from "../constants";
var walkDirectory = function(dir) {
  return fs.readdirSync(dir).reduce(function(previous, filename) {
    var filePath = path.join(dir, filename);
    if (fs.statSync(filePath).isDirectory()) {
      return _to_consumable_array(previous).concat(_to_consumable_array(walkDirectory(filePath)));
    } else {
      return _to_consumable_array(previous).concat([
        filePath
      ]);
    }
  }, []);
};
var isPageComponentFile = function(filePath) {
  if (/\.(d|test|spec|e2e)\.(js|jsx|ts|tsx)$/.test(filePath)) {
    return false;
  }
  if ([
    ".js",
    ".jsx",
    ".ts",
    ".tsx"
  ].includes(path.extname(filePath))) {
    return true;
  }
  return false;
};
var replaceWithAlias = function(base, filePath, alias) {
  if (filePath.includes(base)) {
    return normalizeToPosixPath(path.join(alias, path.relative(base, filePath)));
  } else {
    return filePath;
  }
};
var parseModule = function() {
  var _ref = _async_to_generator(function(param) {
    var source, filename, content, result;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          source = param.source, filename = param.filename;
          content = source;
          if (!JS_EXTENSIONS.some(function(ext) {
            return filename.endsWith(ext);
          }))
            return [
              3,
              2
            ];
          return [
            4,
            transform(content, {
              loader: path.extname(filename).slice(1),
              format: "esm"
            })
          ];
        case 1:
          result = _state.sent();
          content = result.code;
          _state.label = 2;
        case 2:
          return [
            2,
            parse(content)
          ];
      }
    });
  });
  return function parseModule2(_) {
    return _ref.apply(this, arguments);
  };
}();
var hasLoader = function() {
  var _ref = _async_to_generator(function(filename, source) {
    var content, _ref2, moduleExports;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          content = source;
          if (!!source)
            return [
              3,
              2
            ];
          return [
            4,
            fse.readFile(filename, "utf-8")
          ];
        case 1:
          content = _state.sent().toString();
          _state.label = 2;
        case 2:
          if (!content)
            return [
              3,
              4
            ];
          return [
            4,
            parseModule({
              source: content.toString(),
              filename
            })
          ];
        case 3:
          _ref2 = _sliced_to_array.apply(void 0, [
            _state.sent(),
            2
          ]), moduleExports = _ref2[1];
          return [
            2,
            moduleExports.some(function(e) {
              return e.n === LOADER_EXPORT_NAME;
            })
          ];
        case 4:
          return [
            2,
            false
          ];
      }
    });
  });
  return function hasLoader2(filename, source) {
    return _ref.apply(this, arguments);
  };
}();
var hasAction = function() {
  var _ref = _async_to_generator(function(filename, source) {
    var content, _ref2, moduleExports;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          content = source;
          if (!!source)
            return [
              3,
              2
            ];
          return [
            4,
            fse.readFile(filename, "utf-8")
          ];
        case 1:
          content = _state.sent().toString();
          _state.label = 2;
        case 2:
          if (!content)
            return [
              3,
              4
            ];
          return [
            4,
            parseModule({
              source: content.toString(),
              filename
            })
          ];
        case 3:
          _ref2 = _sliced_to_array.apply(void 0, [
            _state.sent(),
            2
          ]), moduleExports = _ref2[1];
          return [
            2,
            moduleExports.some(function(e) {
              return e.n === ACTION_EXPORT_NAME;
            })
          ];
        case 4:
          return [
            2,
            false
          ];
      }
    });
  });
  return function hasAction2(filename, source) {
    return _ref.apply(this, arguments);
  };
}();
var getServerLoadersFile = function(internalDirectory, entryName) {
  return path.join(internalDirectory, entryName, "route-server-loaders.js");
};
var getServerCombinedModueFile = function(internalDirectory, entryName) {
  return path.join(internalDirectory, entryName, "server-loader-combined.js");
};
var getPathWithoutExt = function(filename) {
  var extname = path.extname(filename);
  return filename.slice(0, -extname.length);
};
export {
  getPathWithoutExt,
  getServerCombinedModueFile,
  getServerLoadersFile,
  hasAction,
  hasLoader,
  isPageComponentFile,
  parseModule,
  replaceWithAlias,
  walkDirectory
};
