import * as path from "path";
import { fs } from "@modern-js/utils";
const FILE_EXTENSIONS = [
  ".js",
  ".ts",
  ".mjs",
  ".ejs"
];
const validateAbsolutePath = (filename, message) => {
  if (!path.isAbsolute(filename)) {
    throw new Error(message);
  }
};
const validateAbsolutePaths = (filenames, messageFunc) => {
  filenames.forEach((filename) => validateAbsolutePath(filename, messageFunc(filename)));
};
const compile = async (appDirectory, modernConfig, compileOptions) => {
  var _modernConfig_server;
  const { sourceDirs, distDir, tsconfigPath } = compileOptions;
  validateAbsolutePaths(sourceDirs, (dir) => `source dir ${dir} is not an absolute path.`);
  validateAbsolutePath(distDir, `dist dir ${distDir} is not an absolute path.`);
  const compiler = modernConfig === null || modernConfig === void 0 ? void 0 : (_modernConfig_server = modernConfig.server) === null || _modernConfig_server === void 0 ? void 0 : _modernConfig_server.compiler;
  const isTsProject = tsconfigPath && await fs.pathExists(tsconfigPath);
  if (!isTsProject || compiler === "babel") {
    const { compileByBabel } = await import("../compilers/babel");
    await compileByBabel(appDirectory, modernConfig, compileOptions);
  } else {
    const { compileByTs } = await import("../compilers/typescript");
    await compileByTs(appDirectory, modernConfig, compileOptions);
  }
};
export {
  FILE_EXTENSIONS,
  compile
};
