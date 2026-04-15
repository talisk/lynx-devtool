import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import fs from "fs";
import path from "path";
import glob from "glob";
import pkgUp from "pkg-up";
import { createSelector } from "reselect";
import { escapeRegExp } from "./utils";
var defaultExtensions = [
  ".js",
  ".jsx",
  ".es",
  ".es6",
  ".mjs"
];
var defaultTransformedFunctions = [
  "require",
  "require.resolve",
  "System.import",
  // Jest methods
  "jest.genMockFromModule",
  "jest.mock",
  "jest.unmock",
  "jest.doMock",
  "jest.dontMock",
  "jest.setMock",
  "jest.requireActual",
  "jest.requireMock",
  // Older Jest methods
  "require.requireActual",
  "require.requireMock"
];
function isRegExp(string) {
  return string.startsWith("^") || string.endsWith("$");
}
var specialCwd = {
  babelrc: function() {
    return null;
  },
  packagejson: function(startPath) {
    return pkgUp.sync({
      cwd: startPath
    });
  }
};
function normalizeCwd(optsCwd, currentFile) {
  var cwd;
  if (optsCwd in specialCwd) {
    var startPath = currentFile === "unknown" ? "./" : currentFile;
    var computedCwd = specialCwd[optsCwd](startPath);
    cwd = computedCwd ? path.dirname(computedCwd) : null;
  } else {
    cwd = optsCwd;
  }
  return cwd || process.cwd();
}
function normalizeRoot(optsRoot, cwd) {
  if (!optsRoot) {
    return [];
  }
  var rootArray = Array.isArray(optsRoot) ? optsRoot : [
    optsRoot
  ];
  return rootArray.map(function(dirPath) {
    return path.resolve(cwd, dirPath);
  }).reduce(function(resolvedDirs, absDirPath) {
    if (glob.hasMagic(absDirPath)) {
      var roots = glob.sync(absDirPath).filter(function(resolvedPath) {
        return fs.lstatSync(resolvedPath).isDirectory();
      });
      return _to_consumable_array(resolvedDirs).concat(_to_consumable_array(roots));
    }
    return _to_consumable_array(resolvedDirs).concat([
      absDirPath
    ]);
  }, []);
}
function getAliasTarget(key, isKeyRegExp) {
  var regExpPattern = isKeyRegExp ? key : "^".concat(escapeRegExp(key), "(/.*|)$");
  return new RegExp(regExpPattern);
}
function getAliasSubstitute(value, isKeyRegExp) {
  if (typeof value === "function") {
    return value;
  }
  if (!isKeyRegExp) {
    return function(param) {
      var _param = _sliced_to_array(param, 2), match = _param[1];
      if (Array.isArray(value)) {
        return value.map(function(v) {
          return "".concat(v).concat(match);
        });
      }
      return "".concat(value).concat(match);
    };
  }
  var parts = value.split("\\\\");
  return function(execResult) {
    return parts.map(function(part) {
      return part.replace(/\\\d+/g, function(number) {
        return execResult[number.slice(1)] || "";
      });
    }).join("\\");
  };
}
function normalizeAlias(optsAlias) {
  if (!optsAlias) {
    return [];
  }
  var aliasArray = Array.isArray(optsAlias) ? optsAlias : [
    optsAlias
  ];
  return aliasArray.reduce(function(aliasPairs, alias) {
    var aliasKeys = Object.keys(alias);
    aliasKeys.forEach(function(key) {
      var isKeyRegExp = isRegExp(key);
      aliasPairs.push([
        getAliasTarget(key, isKeyRegExp),
        getAliasSubstitute(alias[key], isKeyRegExp)
      ]);
    });
    return aliasPairs;
  }, []);
}
function normalizeTransformedFunctions(optsTransformFunctions) {
  if (!optsTransformFunctions) {
    return defaultTransformedFunctions;
  }
  return _to_consumable_array(defaultTransformedFunctions).concat(_to_consumable_array(optsTransformFunctions));
}
function normalizeLoglevel(optsLoglevel) {
  return optsLoglevel || "warn";
}
var normalizeOptions_default = createSelector(
  // The currentFile should have an extension; otherwise it's considered a special value
  function(currentFile) {
    return currentFile.includes(".") ? path.dirname(currentFile) : currentFile;
  },
  function(_, opts) {
    return opts;
  },
  function(currentFile, opts) {
    var cwd = normalizeCwd(opts.cwd, currentFile);
    var root = normalizeRoot(opts.root, cwd);
    var alias = normalizeAlias(opts.alias);
    var loglevel = normalizeLoglevel(opts.loglevel);
    var transformFunctions = normalizeTransformedFunctions(opts.transformFunctions);
    var extensions = opts.extensions || defaultExtensions;
    var stripExtensions = opts.stripExtensions || extensions;
    return {
      cwd,
      root,
      alias,
      loglevel,
      transformFunctions,
      extensions,
      stripExtensions,
      customResolvePath: opts.resolvePath
    };
  }
);
export {
  normalizeOptions_default as default
};
