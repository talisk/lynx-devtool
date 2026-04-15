import os from "node:os";
import path from "path";
import { fs as fse } from "@modern-js/utils";
import { nodeFileTrace, resolve } from "@vercel/nft";
import { parseNodeModulePath } from "mlly";
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
      const { subpath } = parseNodeModulePath(src);
      const dest = path.join(projectDir, "node_modules", pkgPath, subpath);
      const dirname = path.dirname(dest);
      await fse.ensureDir(dirname);
      await fse.copyFile(src, dest);
    } else {
      const subpath = path.relative(pkg.versions[version].path, src);
      const dest = path.join(projectDir, "node_modules", pkgPath, subpath);
      const dirname = path.dirname(dest);
      await fse.ensureDir(dirname);
      await fse.copyFile(src, dest);
    }
  }
  const { pkgJSON } = pkg.versions[version];
  applyPublicCondition(pkgJSON);
  const packageJsonPath = path.join(projectDir, "node_modules", pkgPath, "package.json");
  await fse.ensureDir(path.dirname(packageJsonPath));
  await fse.writeFile(packageJsonPath, JSON.stringify(pkgJSON, null, 2));
};
const isWindows = os.platform() === "win32";
const linkPackage = async (from, to, projectRootDir) => {
  const src = path.join(projectRootDir, "node_modules", from);
  const dest = path.join(projectRootDir, "node_modules", to);
  const dstStat = await fse.lstat(dest).catch(() => null);
  const exists = dstStat === null || dstStat === void 0 ? void 0 : dstStat.isSymbolicLink();
  if (exists) {
    return;
  }
  await fse.mkdir(path.dirname(dest), {
    recursive: true
  });
  await fse.symlink(path.relative(path.dirname(dest), src), dest, isWindows ? "junction" : "dir").catch((error) => {
    console.error("Cannot link", from, "to", to, error);
  });
};
const readDirRecursive = async (dir, options = {}) => {
  const { filter } = options;
  const files = await fse.readdir(dir, {
    withFileTypes: true
  });
  const filesAndDirs = await Promise.all(files.map(async (file) => {
    const resolvedPath = path.resolve(dir, file.name);
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
    const stat = await fse.stat(file);
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
  return await nodeFileTrace(entryFiles, {
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
        return resolve(id, parent, job, isCjs);
      }
    },
    ...traceOptions
  });
};
const resolveTracedPath = async (base, p) => fse.realpath(path.resolve(base, p));
const isSubPath = (parentPath, childPath) => {
  if (!parentPath || !childPath) {
    return false;
  }
  const relative = path.relative(parentPath, childPath);
  return relative && !relative.startsWith("..");
};
export {
  findEntryFiles,
  findPackageParents,
  isFile,
  isSubPath,
  linkPackage,
  readDirRecursive,
  resolveTracedPath,
  traceFiles,
  writePackage
};
