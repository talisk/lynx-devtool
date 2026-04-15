import path from "node:path";
import { fs as fse, pkgUp, semver } from "@modern-js/utils";
import { parseNodeModulePath } from "mlly";
import { readPackageJSON } from "pkg-types";
import { traceFiles as defaultTraceFiles, findEntryFiles, findPackageParents, isFile, isSubPath, linkPackage, readDirRecursive, resolveTracedPath, writePackage } from "./utils";
import { nodeFileTrace } from "@vercel/nft";
const handleDependencies = async ({ appDir, serverRootDir, includeEntries, traceFiles = defaultTraceFiles, entryFilter, modifyPackageJson, copyWholePackage, traceOptions }) => {
  const base = "/";
  const entryFiles = await findEntryFiles(serverRootDir, entryFilter);
  const fileTrace = await traceFiles({
    entryFiles: entryFiles.concat(includeEntries),
    serverRootDir,
    base,
    traceOptions
  });
  const currentProjectModules = path.join(appDir, "node_modules");
  const dependencySearchRoot = path.resolve(appDir, "../../../../../../");
  const tracedFiles = Object.fromEntries(await Promise.all([
    ...fileTrace.reasons.entries()
  ].map(async ([_path, reasons]) => {
    if (reasons.ignored) {
      return;
    }
    const filePath = await resolveTracedPath(base, _path);
    if (isSubPath(serverRootDir, filePath) || isSubPath(appDir, filePath) && !isSubPath(currentProjectModules, filePath)) {
      return;
    }
    if (!await isFile(filePath)) {
      return;
    }
    let baseDir;
    let pkgName;
    let subpath;
    let pkgPath;
    if (filePath.includes("node_modules")) {
      const parsed = parseNodeModulePath(filePath);
      baseDir = parsed.dir;
      pkgName = parsed.name;
      subpath = parsed.subpath;
      pkgPath = path.join(baseDir, pkgName);
    } else {
      const MODERN_UTILS_PATH = "packages/toolkit/utils";
      const MODERN_UTILS_PATH_REGEX = new RegExp(`(.*${MODERN_UTILS_PATH})`);
      const match = filePath.match(MODERN_UTILS_PATH_REGEX);
      const packageJsonPath = match ? path.join(match[0], "package.json") : await pkgUp({
        cwd: path.dirname(filePath)
      });
      if (packageJsonPath && isSubPath(dependencySearchRoot, packageJsonPath)) {
        const packageJson = await fse.readJSON(packageJsonPath);
        pkgPath = baseDir = path.dirname(packageJsonPath);
        subpath = path.relative(baseDir, filePath);
        pkgName = packageJson.name;
      }
    }
    if (!baseDir) {
      return;
    }
    const parents = await Promise.all([
      ...reasons.parents
    ].map((p) => resolveTracedPath(base, p)));
    const tracedFile = {
      path: filePath,
      parents,
      isDirectDep: parents.some((parent) => {
        return isSubPath(appDir, parent) && !isSubPath(currentProjectModules, parent);
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
    let pkgJSON = await readPackageJSON(tracedFile.pkgPath, {
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
        const allFiles = await readDirRecursive(tracedFile.pkgPath);
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
      multiVersionPkgs[tracedPackage.name][version] = findPackageParents(tracedPackage, version, tracedFiles);
    }
  }
  await Promise.all(singleVersionPackages.map((pkgName) => {
    const pkg = tracedPackages[pkgName];
    const version = Object.keys(pkg.versions)[0];
    return writePackage({
      pkg,
      version,
      projectDir: serverRootDir
    });
  }));
  const projectPkgJson = await readPackageJSON(serverRootDir).catch(() => ({}));
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
      return semver.lt(v1, v2, {
        loose: true
      }) ? 1 : -1;
    });
    for (const [version, parentPkgs] of versionEntires) {
      const pkg = tracedPackages[pkgName];
      const pkgDestPath = `.modernjs/${pkgName}@${version}/node_modules/${pkgName}`;
      await writePackage({
        pkg,
        version,
        projectDir: serverRootDir,
        _pkgPath: pkgDestPath
      });
      await linkPackage(pkgDestPath, `${pkgName}`, serverRootDir);
      for (const parentPkg of parentPkgs) {
        const parentPkgName = parentPkg.replace(/@[^@]+$/, "");
        await (multiVersionPkgs[parentPkgName] ? linkPackage(pkgDestPath, `.modernjs/${parentPkg}/node_modules/${pkgName}`, serverRootDir) : linkPackage(pkgDestPath, `${parentPkgName}/node_modules/${pkgName}`, serverRootDir));
      }
    }
  }
  const outputPkgPath = path.join(serverRootDir, "package.json");
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
  await fse.writeJSON(outputPkgPath, finalPkgJson);
};
export {
  handleDependencies,
  nodeFileTrace
};
