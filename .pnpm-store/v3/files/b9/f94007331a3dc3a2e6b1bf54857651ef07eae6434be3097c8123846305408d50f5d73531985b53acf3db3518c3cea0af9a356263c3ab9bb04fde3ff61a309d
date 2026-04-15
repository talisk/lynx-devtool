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
var normalizeOptions_exports = {};
__export(normalizeOptions_exports, {
  default: () => normalizeOptions_default
});
module.exports = __toCommonJS(normalizeOptions_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_glob = __toESM(require("glob"));
var import_pkg_up = __toESM(require("pkg-up"));
var import_reselect = require("reselect");
var import_utils = require("./utils");
const defaultExtensions = [
  ".js",
  ".jsx",
  ".es",
  ".es6",
  ".mjs"
];
const defaultTransformedFunctions = [
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
const specialCwd = {
  babelrc: () => null,
  packagejson: (startPath) => import_pkg_up.default.sync({
    cwd: startPath
  })
};
function normalizeCwd(optsCwd, currentFile) {
  let cwd;
  if (optsCwd in specialCwd) {
    const startPath = currentFile === "unknown" ? "./" : currentFile;
    const computedCwd = specialCwd[optsCwd](startPath);
    cwd = computedCwd ? import_path.default.dirname(computedCwd) : null;
  } else {
    cwd = optsCwd;
  }
  return cwd || process.cwd();
}
function normalizeRoot(optsRoot, cwd) {
  if (!optsRoot) {
    return [];
  }
  const rootArray = Array.isArray(optsRoot) ? optsRoot : [
    optsRoot
  ];
  return rootArray.map((dirPath) => import_path.default.resolve(cwd, dirPath)).reduce((resolvedDirs, absDirPath) => {
    if (import_glob.default.hasMagic(absDirPath)) {
      const roots = import_glob.default.sync(absDirPath).filter((resolvedPath) => import_fs.default.lstatSync(resolvedPath).isDirectory());
      return [
        ...resolvedDirs,
        ...roots
      ];
    }
    return [
      ...resolvedDirs,
      absDirPath
    ];
  }, []);
}
function getAliasTarget(key, isKeyRegExp) {
  const regExpPattern = isKeyRegExp ? key : `^${(0, import_utils.escapeRegExp)(key)}(/.*|)$`;
  return new RegExp(regExpPattern);
}
function getAliasSubstitute(value, isKeyRegExp) {
  if (typeof value === "function") {
    return value;
  }
  if (!isKeyRegExp) {
    return ([, match]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${v}${match}`);
      }
      return `${value}${match}`;
    };
  }
  const parts = value.split("\\\\");
  return (execResult) => parts.map((part) => part.replace(/\\\d+/g, (number) => execResult[number.slice(1)] || "")).join("\\");
}
function normalizeAlias(optsAlias) {
  if (!optsAlias) {
    return [];
  }
  const aliasArray = Array.isArray(optsAlias) ? optsAlias : [
    optsAlias
  ];
  return aliasArray.reduce((aliasPairs, alias) => {
    const aliasKeys = Object.keys(alias);
    aliasKeys.forEach((key) => {
      const isKeyRegExp = isRegExp(key);
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
  return [
    ...defaultTransformedFunctions,
    ...optsTransformFunctions
  ];
}
function normalizeLoglevel(optsLoglevel) {
  return optsLoglevel || "warn";
}
var normalizeOptions_default = (0, import_reselect.createSelector)(
  // The currentFile should have an extension; otherwise it's considered a special value
  (currentFile) => currentFile.includes(".") ? import_path.default.dirname(currentFile) : currentFile,
  (_, opts) => opts,
  (currentFile, opts) => {
    const cwd = normalizeCwd(opts.cwd, currentFile);
    const root = normalizeRoot(opts.root, cwd);
    const alias = normalizeAlias(opts.alias);
    const loglevel = normalizeLoglevel(opts.loglevel);
    const transformFunctions = normalizeTransformedFunctions(opts.transformFunctions);
    const extensions = opts.extensions || defaultExtensions;
    const stripExtensions = opts.stripExtensions || extensions;
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
