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
var dependencies_exports = {};
__export(dependencies_exports, {
  handleDependencies: () => handleDependencies,
  nodeFileTrace: () => import_nft.nodeFileTrace
});
module.exports = __toCommonJS(dependencies_exports);
var import_node_path = __toESM(require("node:path"));
var import_utils = require("@modern-js/utils");
var import_mlly = require("mlly");
var import_pkg_types = require("pkg-types");
var import_utils2 = require("./utils");
var import_nft = require("@vercel/nft");
const handleDependencies = async ({ appDir, serverRootDir, includeEntries, traceFiles = import_utils2.traceFiles, entryFilter, modifyPackageJson, copyWholePackage, traceOptions }) => {
  const base = "/";
  const entryFiles = await (0, import_utils2.findEntryFiles)(serverRootDir, entryFilter);
  const fileTrace = await traceFiles({
    entryFiles: entryFiles.concat(includeEntries),
    serverRootDir,
    base,
    traceOptions
  });
  const currentProjectModules = import_node_path.default.join(appDir, "node_modules");
  const dependencySearchRoot = import_node_path.default.resolve(appDir, "../../../../../../");
  const tracedFiles = Object.fromEntries(await Promise.all([
    ...fileTrace.reasons.entries()
  ].map(async ([_path, reasons]) => {
    if (reasons.ignored) {
      return;
    }
    const filePath = await (0, import_utils2.resolveTracedPath)(base, _path);
    if ((0, import_utils2.isSubPath)(serverRootDir, filePath) || (0, import_utils2.isSubPath)(appDir, filePath) && !(0, import_utils2.isSubPath)(currentProjectModules, filePath)) {
      return;
    }
    if (!await (0, import_utils2.isFile)(filePath)) {
      return;
    }
    let baseDir;
    let pkgName;
    let subpath;
    let pkgPath;
    if (filePath.includes("node_modules")) {
      const parsed = (0, import_mlly.parseNodeModulePath)(filePath);
      baseDir = parsed.dir;
      pkgName = parsed.name;
      subpath = parsed.subpath;
      pkgPath = import_node_path.default.join(baseDir, pkgName);
    } else {
      const MODERN_UTILS_PATH = "packages/toolkit/utils";
      const MODERN_UTILS_PATH_REGEX = new RegExp(`(.*${MODERN_UTILS_PATH})`);
      const match = filePath.match(MODERN_UTILS_PATH_REGEX);
      const packageJsonPath = match ? import_node_path.default.join(match[0], "package.json") : await (0, import_utils.pkgUp)({
        cwd: import_node_path.default.dirname(filePath)
      });
      if (packageJsonPath && (0, import_utils2.isSubPath)(dependencySearchRoot, packageJsonPath)) {
        const packageJson = await import_utils.fs.readJSON(packageJsonPath);
        pkgPath = baseDir = import_node_path.default.dirname(packageJsonPath);
        subpath = import_node_path.default.relative(baseDir, filePath);
        pkgName = packageJson.name;
      }
    }
    if (!baseDir) {
      return;
    }
    const parents = await Promise.all([
      ...reasons.parents
    ].map((p) => (0, import_utils2.resolveTracedPath)(base, p)));
    const tracedFile = {
      path: filePath,
      parents,
      isDirectDep: parents.some((parent) => {
        return (0, import_utils2.isSubPath)(appDir, parent) && !(0, import_utils2.isSubPath)(currentProjectModules, parent);
      }),
      subpath,
      pkgName,
      pkgPath
    };
    return [
      filePath,
      tracedFile
    ];
  })).then((r) => r.filter(Boolean)));
  const tracedPackages = {};
  for (const tracedFile of Object.values(tracedFiles)) {
    const { pkgName } = tracedFile;
    let tracedPackage = tracedPackages[pkgName];
    let pkgJSON = await (0, import_pkg_types.readPackageJSON)(tracedFile.pkgPath, {
      cache: true
    }).catch(() => {
    });
    if (!pkgJSON) {
      pkgJSON = {
        name: pkgName,
        version: "0.0.0"
      };
    }
    if (!tracedPackage) {
      tracedPackage = {
        name: pkgName,
        versions: {}
      };
      tracedPackages[pkgName] = tracedPackage;
    }
    let tracedPackageVersion = tracedPackage.versions[pkgJSON.version];
    if (!tracedPackageVersion) {
      tracedPackageVersion = {
        path: tracedFile.pkgPath,
        files: [],
        isDirectDep: false,
        pkgJSON
      };
      if (tracedFile.isDirectDep) {
        tracedPackageVersion.isDirectDep = tracedFile.isDirectDep;
      }
      tracedPackage.versions[pkgJSON.version] = tracedPackageVersion;
    }
    tracedFile.pkgName = pkgName;
    tracedFile.pkgVersion = pkgJSON.version;
    const shouldCopyWholePackage = copyWholePackage === null || copyWholePackage === void 0 ? void 0 : copyWholePackage(pkgName);
    if (tracedFile.path.startsWith(tracedFile.pkgPath) && // Merged package files are based on the version, not on paths, to handle some boundary cases
    tracedPackageVersion.pkgJSON.version === tracedFile.pkgVersion) {
      if (shouldCopyWholePackage) {
        const allFiles = await (0, import_utils2.readDirRecursive)(tracedFile.pkgPath);
        tracedPackageVersion.files.push(...allFiles);
      } else {
        tracedPackageVersion.files.push(tracedFile.path);
      }
    }
  }
  const multiVersionPkgs = {};
  const singleVersionPackages = [];
  for (const tracedPackage of Object.values(tracedPackages)) {
    const versions = Object.keys(tracedPackage.versions);
    if (versions.length === 1) {
      singleVersionPackages.push(tracedPackage.name);
      continue;
    }
    multiVersionPkgs[tracedPackage.name] = {};
    for (const version of versions) {
      multiVersionPkgs[tracedPackage.name][version] = (0, import_utils2.findPackageParents)(tracedPackage, version, tracedFiles);
    }
  }
  await Promise.all(singleVersionPackages.map((pkgName) => {
    const pkg = tracedPackages[pkgName];
    const version = Object.keys(pkg.versions)[0];
    return (0, import_utils2.writePackage)({
      pkg,
      version,
      projectDir: serverRootDir
    });
  }));
  const projectPkgJson = await (0, import_pkg_types.readPackageJSON)(serverRootDir).catch(() => ({}));
  for (const [pkgName, pkgVersions] of Object.entries(multiVersionPkgs)) {
    const versionEntires = Object.entries(pkgVersions).sort(([v1, p1], [v2, p2]) => {
      var _tracedPackages_pkgName_versions_v1, _tracedPackages_pkgName_versions, _tracedPackages_pkgName, _tracedPackages_pkgName_versions_v2, _tracedPackages_pkgName_versions1, _tracedPackages_pkgName1;
      const shouldHoist1 = (_tracedPackages_pkgName = tracedPackages[pkgName]) === null || _tracedPackages_pkgName === void 0 ? void 0 : (_tracedPackages_pkgName_versions = _tracedPackages_pkgName.versions) === null || _tracedPackages_pkgName_versions === void 0 ? void 0 : (_tracedPackages_pkgName_versions_v1 = _tracedPackages_pkgName_versions[v1]) === null || _tracedPackages_pkgName_versions_v1 === void 0 ? void 0 : _tracedPackages_pkgName_versions_v1.isDirectDep;
      const shouldHoist2 = (_tracedPackages_pkgName1 = tracedPackages[pkgName]) === null || _tracedPackages_pkgName1 === void 0 ? void 0 : (_tracedPackages_pkgName_versions1 = _tracedPackages_pkgName1.versions) === null || _tracedPackages_pkgName_versions1 === void 0 ? void 0 : (_tracedPackages_pkgName_versions_v2 = _tracedPackages_pkgName_versions1[v2]) === null || _tracedPackages_pkgName_versions_v2 === void 0 ? void 0 : _tracedPackages_pkgName_versions_v2.isDirectDep;
      if (shouldHoist1 && !shouldHoist2) {
        return -1;
      }
      if (!shouldHoist1 && shouldHoist2) {
        return 1;
      }
      if (p1.length === 0) {
        return -1;
      }
      if (p2.length === 0) {
        return 1;
      }
      return import_utils.semver.lt(v1, v2, {
        loose: true
      }) ? 1 : -1;
    });
    for (const [version, parentPkgs] of versionEntires) {
      const pkg = tracedPackages[pkgName];
      const pkgDestPath = `.modernjs/${pkgName}@${version}/node_modules/${pkgName}`;
      await (0, import_utils2.writePackage)({
        pkg,
        version,
        projectDir: serverRootDir,
        _pkgPath: pkgDestPath
      });
      await (0, import_utils2.linkPackage)(pkgDestPath, `${pkgName}`, serverRootDir);
      for (const parentPkg of parentPkgs) {
        const parentPkgName = parentPkg.replace(/@[^@]+$/, "");
        await (multiVersionPkgs[parentPkgName] ? (0, import_utils2.linkPackage)(pkgDestPath, `.modernjs/${parentPkg}/node_modules/${pkgName}`, serverRootDir) : (0, import_utils2.linkPackage)(pkgDestPath, `${parentPkgName}/node_modules/${pkgName}`, serverRootDir));
      }
    }
  }
  const outputPkgPath = import_node_path.default.join(serverRootDir, "package.json");
  const newPkgJson = {
    name: `${projectPkgJson.name || "modernjs-project"}-prod`,
    version: projectPkgJson.version || "0.0.0",
    private: true,
    type: projectPkgJson.type || "commonjs",
    dependencies: Object.fromEntries([
      ...Object.values(tracedPackages).map((pkg) => [
        pkg.name,
        Object.keys(pkg.versions)[0]
      ])
    ].sort(([a], [b]) => a.localeCompare(b)))
  };
  const finalPkgJson = (modifyPackageJson === null || modifyPackageJson === void 0 ? void 0 : modifyPackageJson(newPkgJson)) || newPkgJson;
  await import_utils.fs.writeJSON(outputPkgPath, finalPkgJson);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleDependencies,
  nodeFileTrace
});
