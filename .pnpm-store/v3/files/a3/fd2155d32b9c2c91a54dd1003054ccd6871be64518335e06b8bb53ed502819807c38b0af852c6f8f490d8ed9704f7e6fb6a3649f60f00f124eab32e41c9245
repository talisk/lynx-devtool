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
var compiler_exports = {};
__export(compiler_exports, {
  compiler: () => compiler,
  getDistFilePath: () => getDistFilePath,
  isRes: () => isRes,
  resolveSourceMap: () => resolveSourceMap
});
module.exports = __toCommonJS(compiler_exports);
var path = __toESM(require("path"));
var babel = __toESM(require("@babel/core"));
var import_utils = require("@modern-js/utils");
var import_constants = require("./constants");
var utils = __toESM(require("./utils"));
const defaultDistDir = "dist";
const isRes = (r) => Boolean(r);
const getDistFilePath = (option) => {
  const { filepath, rootDir, distDir, extMap } = option;
  const ext = path.extname(filepath);
  return path.join(distDir, path.relative(rootDir, filepath).replace(ext, extMap[ext]));
};
const resolveSourceMap = (option) => {
  const { babelRes, sourceFilePath, distFilePath, enableVirtualDist = false } = option;
  const mapLoc = `${distFilePath}.map`;
  babelRes.code = utils.addSourceMappingUrl(babelRes.code, mapLoc);
  if (babelRes.map) {
    babelRes.map.file = path.basename(distFilePath);
    babelRes.map.sources = [
      path.relative(path.dirname(distFilePath), sourceFilePath)
    ];
  }
  const sourceMapVirtualDist = {
    sourcemap: JSON.stringify(babelRes.map),
    sourceMapPath: mapLoc
  };
  if (enableVirtualDist) {
    return sourceMapVirtualDist;
  }
  import_utils.fs.ensureDirSync(path.dirname(mapLoc));
  import_utils.fs.writeFileSync(mapLoc, JSON.stringify(babelRes.map));
  return sourceMapVirtualDist;
};
const compiler = (option) => {
  const { filepath, rootDir, enableVirtualDist = false, distDir = path.join(path.dirname(rootDir), defaultDistDir), verbose = false, babelConfig = {}, distFileExtMap = import_constants.defaultDistFileExtMap, quiet = false } = option;
  const babelRes = babel.transformFileSync(filepath, babelConfig);
  let virtualDist = null;
  if (!isRes(babelRes)) {
    throw new Error(`${filepath} happen error`);
  }
  const distFilePath = getDistFilePath({
    filepath,
    rootDir,
    distDir,
    extMap: distFileExtMap
  });
  if (enableVirtualDist) {
    virtualDist = {
      distPath: distFilePath,
      sourceMapPath: "",
      code: "",
      sourcemap: ""
    };
  }
  if ((babelRes === null || babelRes === void 0 ? void 0 : babelRes.map) && babelConfig.sourceMaps && babelConfig.sourceMaps !== "inline") {
    if (virtualDist) {
      virtualDist = {
        ...virtualDist,
        ...resolveSourceMap({
          babelRes,
          sourceFilePath: filepath,
          distFilePath,
          enableVirtualDist
        })
      };
    } else {
      resolveSourceMap({
        babelRes,
        sourceFilePath: filepath,
        distFilePath,
        enableVirtualDist
      });
    }
  }
  if (virtualDist) {
    virtualDist = {
      ...virtualDist,
      distPath: distFilePath,
      code: babelRes.code
    };
  } else {
    import_utils.fs.ensureDirSync(path.dirname(distFilePath));
    import_utils.fs.writeFileSync(distFilePath, babelRes.code);
  }
  if (verbose && !quiet) {
    import_utils.logger.info(`${filepath} => ${distFilePath}`);
  }
  return virtualDist;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compiler,
  getDistFilePath,
  isRes,
  resolveSourceMap
});
