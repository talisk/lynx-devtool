import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
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
var writePackage = function() {
  var _ref = _async_to_generator(function(options) {
    var pkg, version, projectDir, _pkgPath, pkgPath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, src, subpath, dest, dirname, subpath1, dest1, dirname1, err, pkgJSON, packageJsonPath;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          pkg = options.pkg, version = options.version, projectDir = options.projectDir, _pkgPath = options._pkgPath;
          pkgPath = _pkgPath || pkg.name;
          _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            10,
            11,
            12
          ]);
          _iterator = pkg.versions[version].files[Symbol.iterator]();
          _state.label = 2;
        case 2:
          if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done))
            return [
              3,
              9
            ];
          src = _step.value;
          if (!src.includes("node_modules"))
            return [
              3,
              5
            ];
          subpath = parseNodeModulePath(src).subpath;
          dest = path.join(projectDir, "node_modules", pkgPath, subpath);
          dirname = path.dirname(dest);
          return [
            4,
            fse.ensureDir(dirname)
          ];
        case 3:
          _state.sent();
          return [
            4,
            fse.copyFile(src, dest)
          ];
        case 4:
          _state.sent();
          return [
            3,
            8
          ];
        case 5:
          subpath1 = path.relative(pkg.versions[version].path, src);
          dest1 = path.join(projectDir, "node_modules", pkgPath, subpath1);
          dirname1 = path.dirname(dest1);
          return [
            4,
            fse.ensureDir(dirname1)
          ];
        case 6:
          _state.sent();
          return [
            4,
            fse.copyFile(src, dest1)
          ];
        case 7:
          _state.sent();
          _state.label = 8;
        case 8:
          _iteratorNormalCompletion = true;
          return [
            3,
            2
          ];
        case 9:
          return [
            3,
            12
          ];
        case 10:
          err = _state.sent();
          _didIteratorError = true;
          _iteratorError = err;
          return [
            3,
            12
          ];
        case 11:
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
          return [
            7
          ];
        case 12:
          pkgJSON = pkg.versions[version].pkgJSON;
          applyPublicCondition(pkgJSON);
          packageJsonPath = path.join(projectDir, "node_modules", pkgPath, "package.json");
          return [
            4,
            fse.ensureDir(path.dirname(packageJsonPath))
          ];
        case 13:
          _state.sent();
          return [
            4,
            fse.writeFile(packageJsonPath, JSON.stringify(pkgJSON, null, 2))
          ];
        case 14:
          _state.sent();
          return [
            2
          ];
      }
    });
  });
  return function writePackage2(options) {
    return _ref.apply(this, arguments);
  };
}();
var isWindows = os.platform() === "win32";
var linkPackage = function() {
  var _ref = _async_to_generator(function(from, to, projectRootDir) {
    var src, dest, dstStat, exists;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          src = path.join(projectRootDir, "node_modules", from);
          dest = path.join(projectRootDir, "node_modules", to);
          return [
            4,
            fse.lstat(dest).catch(function() {
              return null;
            })
          ];
        case 1:
          dstStat = _state.sent();
          exists = dstStat === null || dstStat === void 0 ? void 0 : dstStat.isSymbolicLink();
          if (exists) {
            return [
              2
            ];
          }
          return [
            4,
            fse.mkdir(path.dirname(dest), {
              recursive: true
            })
          ];
        case 2:
          _state.sent();
          return [
            4,
            fse.symlink(path.relative(path.dirname(dest), src), dest, isWindows ? "junction" : "dir").catch(function(error) {
              console.error("Cannot link", from, "to", to, error);
            })
          ];
        case 3:
          _state.sent();
          return [
            2
          ];
      }
    });
  });
  return function linkPackage2(from, to, projectRootDir) {
    return _ref.apply(this, arguments);
  };
}();
var readDirRecursive = function() {
  var _ref = _async_to_generator(function(dir) {
    var options, filter, files, filesAndDirs;
    var _arguments = arguments;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          options = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
          filter = options.filter;
          return [
            4,
            fse.readdir(dir, {
              withFileTypes: true
            })
          ];
        case 1:
          files = _state.sent();
          return [
            4,
            Promise.all(files.map(function() {
              var _ref2 = _async_to_generator(function(file) {
                var resolvedPath;
                return _ts_generator(this, function(_state2) {
                  resolvedPath = path.resolve(dir, file.name);
                  if (file.isDirectory()) {
                    return [
                      2,
                      readDirRecursive(resolvedPath, options)
                    ];
                  } else {
                    return [
                      2,
                      filter && !filter(resolvedPath) ? [] : resolvedPath
                    ];
                  }
                  return [
                    2
                  ];
                });
              });
              return function(file) {
                return _ref2.apply(this, arguments);
              };
            }()))
          ];
        case 2:
          filesAndDirs = _state.sent();
          return [
            2,
            filesAndDirs.flat()
          ];
      }
    });
  });
  return function readDirRecursive2(dir) {
    return _ref.apply(this, arguments);
  };
}();
var isFile = function() {
  var _ref = _async_to_generator(function(file) {
    var stat, error;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          _state.trys.push([
            0,
            2,
            ,
            3
          ]);
          return [
            4,
            fse.stat(file)
          ];
        case 1:
          stat = _state.sent();
          return [
            2,
            stat.isFile()
          ];
        case 2:
          error = _state.sent();
          if (error.code === "ENOENT") {
            return [
              2,
              false
            ];
          }
          throw error;
        case 3:
          return [
            2
          ];
      }
    });
  });
  return function isFile2(file) {
    return _ref.apply(this, arguments);
  };
}();
var findEntryFiles = function() {
  var _ref = _async_to_generator(function(rootDir, entryFilter) {
    var files;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            readDirRecursive(rootDir, {
              filter: entryFilter
            })
          ];
        case 1:
          files = _state.sent();
          return [
            2,
            files.filter(function(file) {
              return file.endsWith(".mjs") || file.endsWith(".cjs") || file.endsWith(".js");
            })
          ];
      }
    });
  });
  return function findEntryFiles2(rootDir, entryFilter) {
    return _ref.apply(this, arguments);
  };
}();
var findPackageParents = function(pkg, version, tracedFiles) {
  var versionFiles = pkg.versions[version].files.map(function(path2) {
    return tracedFiles[path2];
  });
  var parentPkgs = _to_consumable_array(new Set(versionFiles.flatMap(function(file) {
    return (
      // Because it supports copyWholePackage configuration, not all files exist.
      file === null || file === void 0 ? void 0 : file.parents.map(function(parentPath) {
        var parentFile = tracedFiles[parentPath];
        if (!parentFile || parentFile.pkgName === pkg.name) {
          return null;
        }
        return "".concat(parentFile.pkgName, "@").concat(parentFile.pkgVersion);
      }).filter(Boolean)
    );
  })));
  return parentPkgs.filter(function(parentPkg) {
    return parentPkg;
  });
};
var traceFiles = function() {
  var _ref = _async_to_generator(function(param) {
    var entryFiles, serverRootDir, _param_base, base, traceOptions;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          entryFiles = param.entryFiles, serverRootDir = param.serverRootDir, _param_base = param.base, base = _param_base === void 0 ? "/" : _param_base, traceOptions = param.traceOptions;
          return [
            4,
            nodeFileTrace(entryFiles, _object_spread({
              base,
              processCwd: serverRootDir,
              resolve: function() {
                var _ref2 = _async_to_generator(function(id, parent, job, isCjs) {
                  return _ts_generator(this, function(_state2) {
                    if (id.startsWith("@modern-js/prod-server")) {
                      return [
                        2,
                        require.resolve(id, {
                          paths: [
                            require.resolve("@modern-js/app-tools")
                          ]
                        })
                      ];
                    } else {
                      return [
                        2,
                        resolve(id, parent, job, isCjs)
                      ];
                    }
                    return [
                      2
                    ];
                  });
                });
                return function(id, parent, job, isCjs) {
                  return _ref2.apply(this, arguments);
                };
              }()
            }, traceOptions))
          ];
        case 1:
          return [
            2,
            _state.sent()
          ];
      }
    });
  });
  return function traceFiles2(_) {
    return _ref.apply(this, arguments);
  };
}();
var resolveTracedPath = function() {
  var _ref = _async_to_generator(function(base, p) {
    return _ts_generator(this, function(_state) {
      return [
        2,
        fse.realpath(path.resolve(base, p))
      ];
    });
  });
  return function resolveTracedPath2(base, p) {
    return _ref.apply(this, arguments);
  };
}();
var isSubPath = function(parentPath, childPath) {
  if (!parentPath || !childPath) {
    return false;
  }
  var relative = path.relative(parentPath, childPath);
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
