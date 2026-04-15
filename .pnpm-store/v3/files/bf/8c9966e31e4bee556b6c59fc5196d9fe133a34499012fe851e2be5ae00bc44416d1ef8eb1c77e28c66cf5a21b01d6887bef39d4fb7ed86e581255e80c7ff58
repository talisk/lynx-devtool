import fs from "fs";
import path from "path";
import { JS_EXTENSIONS, fs as fse, normalizeToPosixPath } from "@modern-js/utils";
import { parse } from "es-module-lexer";
import { transform } from "esbuild";
import { ACTION_EXPORT_NAME, LOADER_EXPORT_NAME } from "../constants";
const walkDirectory = (dir) => fs.readdirSync(dir).reduce((previous, filename) => {
  const filePath = path.join(dir, filename);
  if (fs.statSync(filePath).isDirectory()) {
    return [
      ...previous,
      ...walkDirectory(filePath)
    ];
  } else {
    return [
      ...previous,
      filePath
    ];
  }
}, []);
const isPageComponentFile = (filePath) => {
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
const replaceWithAlias = (base, filePath, alias) => {
  if (filePath.includes(base)) {
    return normalizeToPosixPath(path.join(alias, path.relative(base, filePath)));
  } else {
    return filePath;
  }
};
const parseModule = async ({ source, filename }) => {
  let content = source;
  if (JS_EXTENSIONS.some((ext) => filename.endsWith(ext))) {
    const result = await transform(content, {
      loader: path.extname(filename).slice(1),
      format: "esm"
    });
    content = result.code;
  }
  return parse(content);
};
const hasLoader = async (filename, source) => {
  let content = source;
  if (!source) {
    content = (await fse.readFile(filename, "utf-8")).toString();
  }
  if (content) {
    const [, moduleExports] = await parseModule({
      source: content.toString(),
      filename
    });
    return moduleExports.some((e) => e.n === LOADER_EXPORT_NAME);
  }
  return false;
};
const hasAction = async (filename, source) => {
  let content = source;
  if (!source) {
    content = (await fse.readFile(filename, "utf-8")).toString();
  }
  if (content) {
    const [, moduleExports] = await parseModule({
      source: content.toString(),
      filename
    });
    return moduleExports.some((e) => e.n === ACTION_EXPORT_NAME);
  }
  return false;
};
const getServerLoadersFile = (internalDirectory, entryName) => {
  return path.join(internalDirectory, entryName, "route-server-loaders.js");
};
const getServerCombinedModueFile = (internalDirectory, entryName) => {
  return path.join(internalDirectory, entryName, "server-loader-combined.js");
};
const getPathWithoutExt = (filename) => {
  const extname = path.extname(filename);
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
