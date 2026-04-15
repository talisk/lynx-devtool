import {
  __commonJS,
  __toESM,
  init_esm_shims
} from "./chunk-YOUCX3TK.js";

// node_modules/.pnpm/levdist@1.0.0/node_modules/levdist/index.js
var require_levdist = __commonJS({
  "node_modules/.pnpm/levdist@1.0.0/node_modules/levdist/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = function(s, t) {
      var d = [];
      var n = s.length;
      var m = t.length;
      if (n == 0) return m;
      if (m == 0) return n;
      for (var i = n; i >= 0; i--) d[i] = [];
      for (var i = n; i >= 0; i--) d[i][0] = i;
      for (var j = m; j >= 0; j--) d[0][j] = j;
      for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);
        for (var j = 1; j <= m; j++) {
          if (i == j && d[i][j] > 4) return n;
          var t_j = t.charAt(j - 1);
          var cost = s_i == t_j ? 0 : 1;
          var mi = d[i - 1][j] + 1;
          var b = d[i][j - 1] + 1;
          var c = d[i - 1][j - 1] + cost;
          if (b < mi) mi = b;
          if (c < mi) mi = c;
          d[i][j] = mi;
          if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
          }
        }
      }
      return d[n][m];
    };
  }
});

// node_modules/.pnpm/line-diff@2.1.1/node_modules/line-diff/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/line-diff@2.1.1/node_modules/line-diff/lib/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var LevDist = require_levdist();
    var Change = (
      /*!
       * Change
       * This is used for comparing two lines.
       *
       * @name Change
       * @function
       * @param {String} oldLine The old line value.
       * @param {String} addedLine The new line.
       * @param {Number} sensitivity The diff sensitivity.
       * @return {Change} The `Change` object:
       *
       *  - `_` (Array): An array with the old line and the new line.
       *  - `changes` (Number): How many changes are there, calculated with the levenshtein distance algorithm.
       *  - `modified` (Boolean): A boolean value representing if the old line was modified or not.
       */
      function Change2(oldLine, addedLine, sensitivity, lineno) {
        _classCallCheck(this, Change2);
        this._ = [oldLine, addedLine];
        this.changes = LevDist(oldLine, addedLine);
        this.modified = this.changes > sensitivity;
        this.lineno = lineno;
      }
    );
    var Diff = function() {
      function Diff2(oldLines, newLines, sensitivity) {
        var _this = this;
        _classCallCheck(this, Diff2);
        this.sensitivity = sensitivity || 0;
        this.changes = [];
        oldLines = typeof oldLines === "string" ? oldLines.split("\n") : oldLines;
        newLines = typeof newLines === "string" ? newLines.split("\n") : newLines;
        this.old_lines = oldLines;
        this.new_lines = newLines;
        var cOldLine = null;
        newLines.forEach(function(cNewLine, i) {
          cOldLine = oldLines[i] || "";
          _this.changes.push(new Change(cOldLine, cNewLine, _this.sensitivity, i + 1));
        });
      }
      _createClass(Diff2, [{
        key: "toString",
        value: function toString() {
          var str = "", cDiff = { added: "", removed: "" };
          this.changes.forEach(function(cChange) {
            if (!cChange.modified) {
              str += cDiff.removed;
              str += cDiff.added;
              cDiff.removed = "";
              cDiff.added = "";
              str += "   " + cChange._[1] + "\n";
            } else {
              cDiff.removed += " - " + cChange._[0] + "\n";
              if (cChange._[1]) {
                cDiff.added += " + " + cChange._[1] + "\n";
              }
            }
          });
          str += cDiff.removed;
          str += cDiff.added;
          return str;
        }
      }]);
      return Diff2;
    }();
    module.exports = Diff;
  }
});

// src/loader.ts
init_esm_shims();
var import_line_diff = __toESM(require_lib(), 1);
import fs from "node:fs";
import path from "node:path";
var NODE_MODULES_REGEX = /[\\/]node_modules[\\/]/;
var isInNodeModules = (path2) => NODE_MODULES_REGEX.test(path2);
var CSS_MODULES_REGEX = /\.module\.\w+$/i;
var getNoDeclarationFileError = ({ filename }) => new Error(
  `Generated type declaration does not exist. Run Rsbuild and commit the type declaration for '${filename}'`
);
var isCSSModules = ({
  resourcePath,
  resourceQuery,
  resourceFragment,
  modules
}) => {
  if (typeof modules === "boolean") {
    return modules;
  }
  if (typeof modules === "string") {
    return modules !== "global";
  }
  const { auto } = modules;
  if (typeof auto === "boolean") {
    return auto && CSS_MODULES_REGEX.test(resourcePath);
  }
  if (auto instanceof RegExp) {
    return auto.test(resourcePath);
  }
  if (typeof auto === "function") {
    return auto(resourcePath, resourceQuery, resourceFragment);
  }
  return true;
};
var isNamedExport = (modules) => {
  if (typeof modules === "boolean" || typeof modules === "string") {
    return false;
  }
  return modules.namedExport;
};
var getTypeMismatchError = ({
  filename,
  expected,
  actual
}) => {
  const diff = new import_line_diff.default(
    enforceLFLineSeparators(actual),
    expected
  ).toString();
  return new Error(
    `Generated type declaration file is outdated. Run Rsbuild and commit the updated type declaration for '${filename}'

${diff}`
  );
};
function wrapQuotes(key) {
  const isValidIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
  if (isValidIdentifier) {
    return key;
  }
  return `'${key}'`;
}
var cssModuleToNamedExports = (cssModuleKeys) => {
  return cssModuleKeys.sort().map((key) => `export const ${key}: string;`).join("\n");
};
var cssModuleToInterface = (cssModulesKeys) => {
  const interfaceFields = cssModulesKeys.sort().map((key) => `  ${wrapQuotes(key)}: string;`).join("\n");
  return `interface CssExports {
${interfaceFields}
}`;
};
var filenameToTypingsFilename = (filename) => {
  const dirName = path.dirname(filename);
  const baseName = path.basename(filename);
  return path.join(dirName, `${baseName}.d.ts`);
};
var enforceLFLineSeparators = (text) => {
  if (text) {
    return text.replace(/\r\n/g, "\n");
  }
  return text;
};
var compareText = (contentA, contentB) => {
  return enforceLFLineSeparators(contentA) === enforceLFLineSeparators(contentB);
};
var validModes = ["emit", "verify"];
var isFileNotFound = (err) => err && err.code === "ENOENT";
var makeDoneHandlers = (callback, content, rest) => ({
  failed: (e) => callback(e),
  success: () => callback(null, content, ...rest)
});
var makeFileHandlers = (filename) => ({
  read: (handler) => fs.readFile(filename, { encoding: "utf-8" }, handler),
  write: (content, handler) => fs.writeFile(filename, content, { encoding: "utf-8" }, handler)
});
var extractLocalExports = (content) => {
  let localExports = content.split("exports.locals")[1];
  if (!localExports) {
    localExports = content.split("___CSS_LOADER_EXPORT___.locals")[1];
  }
  return localExports;
};
var getCSSModulesKeys = (content, namedExport) => {
  const keys = /* @__PURE__ */ new Set();
  if (namedExport) {
    const exportsRegex = /export\s+var\s+(\w+)\s*=/g;
    let match2 = exportsRegex.exec(content);
    while (match2 !== null) {
      keys.add(match2[1]);
      match2 = exportsRegex.exec(content);
    }
    return Array.from(keys);
  }
  const localExports = extractLocalExports(content);
  const keyRegex = /"([^\\"]+)":/g;
  let match = keyRegex.exec(localExports);
  while (match !== null) {
    keys.add(match[1]);
    match = keyRegex.exec(localExports);
  }
  return Array.from(keys);
};
function codegen(keys, namedExport) {
  const bannerMessage = "// This file is automatically generated.\n// Please do not change this file!";
  if (namedExport) {
    return `${bannerMessage}
${cssModuleToNamedExports(keys)}
`;
  }
  const cssModuleExport = "declare const cssExports: CssExports;\nexport default cssExports;\n";
  return `${bannerMessage}
${cssModuleToInterface(keys)}
${cssModuleExport}`;
}
function loader_default(content, ...rest) {
  const { failed, success } = makeDoneHandlers(this.async(), content, rest);
  const { resourcePath, resourceQuery, resourceFragment } = this;
  const { mode = "emit", modules = true } = this.getOptions() || {};
  if (!validModes.includes(mode)) {
    failed(new Error(`Invalid mode option: ${mode}`));
    return;
  }
  if (!isCSSModules({ resourcePath, resourceQuery, resourceFragment, modules }) || isInNodeModules(resourcePath)) {
    success();
    return;
  }
  const cssModuleInterfaceFilename = filenameToTypingsFilename(resourcePath);
  const { read, write } = makeFileHandlers(cssModuleInterfaceFilename);
  const namedExport = isNamedExport(modules);
  const cssModulesKeys = getCSSModulesKeys(content, namedExport);
  const cssModulesCode = codegen(cssModulesKeys, namedExport);
  if (mode === "verify") {
    read((err, fileContents) => {
      if (isFileNotFound(err)) {
        return failed(
          getNoDeclarationFileError({
            filename: cssModuleInterfaceFilename
          })
        );
      }
      if (err) {
        return failed(err);
      }
      if (!compareText(cssModulesCode, fileContents)) {
        return failed(
          getTypeMismatchError({
            filename: cssModuleInterfaceFilename,
            expected: cssModulesCode,
            actual: fileContents
          })
        );
      }
      return success();
    });
  } else {
    read((_, fileContents) => {
      if (!compareText(cssModulesCode, fileContents)) {
        write(cssModulesCode, (err) => {
          if (err) {
            failed(err);
          } else {
            success();
          }
        });
      } else {
        success();
      }
    });
  }
}
export {
  loader_default as default,
  isCSSModules,
  wrapQuotes
};
