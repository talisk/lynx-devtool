import * as path from "path";
import * as babel from "@babel/core";
import { fs, logger } from "@modern-js/utils";
import { defaultDistFileExtMap } from "./constants";
import * as utils from "./utils";
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
  fs.ensureDirSync(path.dirname(mapLoc));
  fs.writeFileSync(mapLoc, JSON.stringify(babelRes.map));
  return sourceMapVirtualDist;
};
const compiler = (option) => {
  const { filepath, rootDir, enableVirtualDist = false, distDir = path.join(path.dirname(rootDir), defaultDistDir), verbose = false, babelConfig = {}, distFileExtMap = defaultDistFileExtMap, quiet = false } = option;
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
    fs.ensureDirSync(path.dirname(distFilePath));
    fs.writeFileSync(distFilePath, babelRes.code);
  }
  if (verbose && !quiet) {
    logger.info(`${filepath} => ${distFilePath}`);
  }
  return virtualDist;
};
export {
  compiler,
  getDistFilePath,
  isRes,
  resolveSourceMap
};
