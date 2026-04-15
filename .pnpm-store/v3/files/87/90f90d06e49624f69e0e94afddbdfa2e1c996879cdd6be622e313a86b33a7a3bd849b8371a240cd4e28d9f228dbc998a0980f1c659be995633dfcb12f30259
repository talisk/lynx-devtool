import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as path from "path";
import * as babel from "@babel/core";
import { fs, logger } from "@modern-js/utils";
import { defaultDistFileExtMap } from "./constants";
import * as utils from "./utils";
var defaultDistDir = "dist";
var isRes = function(r) {
  return Boolean(r);
};
var getDistFilePath = function(option) {
  var filepath = option.filepath, rootDir = option.rootDir, distDir = option.distDir, extMap = option.extMap;
  var ext = path.extname(filepath);
  return path.join(distDir, path.relative(rootDir, filepath).replace(ext, extMap[ext]));
};
var resolveSourceMap = function(option) {
  var babelRes = option.babelRes, sourceFilePath = option.sourceFilePath, distFilePath = option.distFilePath, _option_enableVirtualDist = option.enableVirtualDist, enableVirtualDist = _option_enableVirtualDist === void 0 ? false : _option_enableVirtualDist;
  var mapLoc = "".concat(distFilePath, ".map");
  babelRes.code = utils.addSourceMappingUrl(babelRes.code, mapLoc);
  if (babelRes.map) {
    babelRes.map.file = path.basename(distFilePath);
    babelRes.map.sources = [
      path.relative(path.dirname(distFilePath), sourceFilePath)
    ];
  }
  var sourceMapVirtualDist = {
    sourcemap: JSON.stringify(babelRes.map),
    sourceMapPath: mapLoc
  };
  if (enableVirtualDist) {
    return sourceMapVirtualDist;
  }
  fs.ensureDirSync(path.dirname(mapLoc));
  fs.writeFileSync(mapLoc, JSON.stringify(babelRes.map));
  return sourceMapVirtualDist;
};
var compiler = function(option) {
  var filepath = option.filepath, rootDir = option.rootDir, _option_enableVirtualDist = option.enableVirtualDist, enableVirtualDist = _option_enableVirtualDist === void 0 ? false : _option_enableVirtualDist, _option_distDir = option.distDir, distDir = _option_distDir === void 0 ? path.join(path.dirname(rootDir), defaultDistDir) : _option_distDir, _option_verbose = option.verbose, verbose = _option_verbose === void 0 ? false : _option_verbose, _option_babelConfig = option.babelConfig, babelConfig = _option_babelConfig === void 0 ? {} : _option_babelConfig, _option_distFileExtMap = option.distFileExtMap, distFileExtMap = _option_distFileExtMap === void 0 ? defaultDistFileExtMap : _option_distFileExtMap, _option_quiet = option.quiet, quiet = _option_quiet === void 0 ? false : _option_quiet;
  var babelRes = babel.transformFileSync(filepath, babelConfig);
  var virtualDist = null;
  if (!isRes(babelRes)) {
    throw new Error("".concat(filepath, " happen error"));
  }
  var distFilePath = getDistFilePath({
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
      virtualDist = _object_spread({}, virtualDist, resolveSourceMap({
        babelRes,
        sourceFilePath: filepath,
        distFilePath,
        enableVirtualDist
      }));
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
    virtualDist = _object_spread_props(_object_spread({}, virtualDist), {
      distPath: distFilePath,
      code: babelRes.code
    });
  } else {
    fs.ensureDirSync(path.dirname(distFilePath));
    fs.writeFileSync(distFilePath, babelRes.code);
  }
  if (verbose && !quiet) {
    logger.info("".concat(filepath, " => ").concat(distFilePath));
  }
  return virtualDist;
};
export {
  compiler,
  getDistFilePath,
  isRes,
  resolveSourceMap
};
