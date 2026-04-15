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
var utils_exports = {};
__export(utils_exports, {
  findEntryFiles: () => findEntryFiles,
  findPackageParents: () => findPackageParents,
  isFile: () => isFile,
  isSubPath: () => isSubPath,
  linkPackage: () => linkPackage,
  readDirRecursive: () => readDirRecursive,
  resolveTracedPath: () => resolveTracedPath,
  traceFiles: () => traceFiles,
  writePackage: () => writePackage
});
module.exports = __toCommonJS(utils_exports);
var import_node_os = __toESM(require("node:os"));
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_nft = require("@vercel/nft");
var import_mlly = require("mlly");
function applyPublicCondition(pkg) {
  var _pkg_publishConfig;
  if (pkg === null || pkg === void 0 ? void 0 : (_pkg_publishConfig = pkg.publishConfig) === null || _pkg_publishConfig === void 0 ? void 0 : _pkg_publishConfig.exports) {
    var _pkg_publishConfig1;
    pkg.exports = pkg === null || pkg === void 0 ? void 0 : (_pkg_publishConfig1 = pkg.publishConfig) === null || _pkg_publishConfig1 === void 0 ? void 0 : _pkg_publishConfig1.exports;
  }
}
const writePackage = async (options) => {
  const { pkg, version, projectDir, _pkgPath } = options;
  const pkgPath = _pkgPath || pkg.name;
  for (const src of pkg.versions[version].files) {
    if (src.includes("node_modules")) {
      const { subpath } = (0, import_mlly.parseNodeModulePath)(src);
      const dest = import_path.default.join(projectDir, "node_modules", pkgPath, subpath);
      const dirname = import_path.default.dirname(dest);
      await import_utils.fs.ensureDir(dirname);
      await import_utils.fs.copyFile(src, dest);
    } else {
      const subpath = import_path.default.relative(pkg.versions[version].path, src);
      const dest = import_path.default.join(projectDir, "node_modules", pkgPath, subpath);
      const dirname = import_path.default.dirname(dest);
      await import_utils.fs.ensureDir(dirname);
      await import_utils.fs.copyFile(src, dest);
    }
  }
  const { pkgJSON } = pkg.versions[version];
  applyPublicCondition(pkgJSON);
  const packageJsonPath = import_path.default.join(projectDir, "node_modules", pkgPath, "package.json");
  await import_utils.fs.ensureDir(import_path.default.dirname(packageJsonPath));
  await import_utils.fs.writeFile(packageJsonPath, JSON.stringify(pkgJSON, null, 2));
};
const isWindows = import_node_os.default.platform() === "win32";
const linkPackage = async (from, to, projectRootDir) => {
  const src = import_path.default.join(projectRootDir, "node_modules", from);
  const dest = import_path.default.join(projectRootDir, "node_modules", to);
  const dstStat = await import_utils.fs.lstat(dest).catch(() => null);
  const exists = dstStat === null || dstStat === void 0 ? void 0 : dstStat.isSymbolicLink();
  if (exists) {
    return;
  }
  await import_utils.fs.mkdir(import_path.default.dirname(dest), {
    recursive: true
  });
  await import_utils.fs.symlink(import_path.default.relative(import_path.default.dirname(dest), src), dest, isWindows ? "junction" : "dir").catch((error) => {
    console.error("Cannot link", from, "to", to, error);
  });
};
const readDirRecursive = async (dir, options = {}) => {
  const { filter } = options;
  const files = await import_utils.fs.readdir(dir, {
    withFileTypes: true
  });
  const filesAndDirs = await Promise.all(files.map(async (file) => {
    const resolvedPath = import_path.default.resolve(dir, file.name);
    if (file.isDirectory()) {
      return readDirRecursive(resolvedPath, options);
    } else {
      return filter && !filter(resolvedPath) ? [] : resolvedPath;
    }
  }));
  return filesAndDirs.flat();
};
const isFile = async (file) => {
  try {
    const stat = await import_utils.fs.stat(file);
    return stat.isFile();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
};
const findEntryFiles = async (rootDir, entryFilter) => {
  const files = await readDirRecursive(rootDir, {
    filter: entryFilter
  });
  return files.filter((file) => file.endsWith(".mjs") || file.endsWith(".cjs") || file.endsWith(".js"));
};
const findPackageParents = (pkg, version, tracedFiles) => {
  const versionFiles = pkg.versions[version].files.map((path2) => tracedFiles[path2]);
  const parentPkgs = [
    ...new Set(versionFiles.flatMap((file) => (
      // Because it supports copyWholePackage configuration, not all files exist.
      file === null || file === void 0 ? void 0 : file.parents.map((parentPath) => {
        const parentFile = tracedFiles[parentPath];
        if (!parentFile || parentFile.pkgName === pkg.name) {
          return null;
        }
        return `${parentFile.pkgName}@${parentFile.pkgVersion}`;
      }).filter(Boolean)
    )))
  ];
  return parentPkgs.filter((parentPkg) => parentPkg);
};
const traceFiles = async ({ entryFiles, serverRootDir, base = "/", traceOptions }) => {
  return await (0, import_nft.nodeFileTrace)(entryFiles, {
    base,
    processCwd: serverRootDir,
    resolve: async (id, parent, job, isCjs) => {
      if (id.startsWith("@modern-js/prod-server")) {
        return require.resolve(id, {
          paths: [
            require.resolve("@modern-js/app-tools")
          ]
        });
      } else {
        return (0, import_nft.resolve)(id, parent, job, isCjs);
      }
    },
    ...traceOptions
  });
};
const resolveTracedPath = async (base, p) => import_utils.fs.realpath(import_path.default.resolve(base, p));
const isSubPath = (parentPath, childPath) => {
  if (!parentPath || !childPath) {
    return false;
  }
  const relative = import_path.default.relative(parentPath, childPath);
  return relative && !relative.startsWith("..");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findEntryFiles,
  findPackageParents,
  isFile,
  isSubPath,
  linkPackage,
  readDirRecursive,
  resolveTracedPath,
  traceFiles,
  writePackage
});
