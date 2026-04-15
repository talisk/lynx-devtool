import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { _ as _ts_values } from "@swc/helpers/_/_ts_values";
import path from "node:path";
import { fs as fse, pkgUp, semver } from "@modern-js/utils";
import { parseNodeModulePath } from "mlly";
import { readPackageJSON } from "pkg-types";
import { traceFiles as defaultTraceFiles, findEntryFiles, findPackageParents, isFile, isSubPath, linkPackage, readDirRecursive, resolveTracedPath, writePackage } from "./utils";
import { nodeFileTrace } from "@vercel/nft";
var handleDependencies = function() {
  var _ref = _async_to_generator(function(param) {
    var appDir, serverRootDir, includeEntries, _param_traceFiles, traceFiles, entryFilter, modifyPackageJson, copyWholePackage, traceOptions, base, entryFiles, fileTrace, currentProjectModules, dependencySearchRoot, tracedFiles, _, tracedPackages, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tracedFile, pkgName, tracedPackage, pkgJSON, tracedPackageVersion, shouldCopyWholePackage, _tracedPackageVersion_files, allFiles, err, multiVersionPkgs, singleVersionPackages, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, tracedPackage1, versions, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, version, projectPkgJson, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3, err, outputPkgPath, newPkgJson, finalPkgJson;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          appDir = param.appDir, serverRootDir = param.serverRootDir, includeEntries = param.includeEntries, _param_traceFiles = param.traceFiles, traceFiles = _param_traceFiles === void 0 ? defaultTraceFiles : _param_traceFiles, entryFilter = param.entryFilter, modifyPackageJson = param.modifyPackageJson, copyWholePackage = param.copyWholePackage, traceOptions = param.traceOptions;
          base = "/";
          return [
            4,
            findEntryFiles(serverRootDir, entryFilter)
          ];
        case 1:
          entryFiles = _state.sent();
          return [
            4,
            traceFiles({
              entryFiles: entryFiles.concat(includeEntries),
              serverRootDir,
              base,
              traceOptions
            })
          ];
        case 2:
          fileTrace = _state.sent();
          currentProjectModules = path.join(appDir, "node_modules");
          dependencySearchRoot = path.resolve(appDir, "../../../../../../");
          _ = Object.fromEntries;
          return [
            4,
            Promise.all(_to_consumable_array(fileTrace.reasons.entries()).map(function() {
              var _ref2 = _async_to_generator(function(param2) {
                var _param, _path, reasons, filePath, baseDir, pkgName2, subpath, pkgPath, parsed, MODERN_UTILS_PATH, MODERN_UTILS_PATH_REGEX, match, packageJsonPath, _tmp, packageJson, parents, tracedFile2;
                return _ts_generator(this, function(_state2) {
                  switch (_state2.label) {
                    case 0:
                      _param = _sliced_to_array(param2, 2), _path = _param[0], reasons = _param[1];
                      if (reasons.ignored) {
                        return [
                          2
                        ];
                      }
                      return [
                        4,
                        resolveTracedPath(base, _path)
                      ];
                    case 1:
                      filePath = _state2.sent();
                      if (isSubPath(serverRootDir, filePath) || isSubPath(appDir, filePath) && !isSubPath(currentProjectModules, filePath)) {
                        return [
                          2
                        ];
                      }
                      return [
                        4,
                        isFile(filePath)
                      ];
                    case 2:
                      if (!_state2.sent()) {
                        return [
                          2
                        ];
                      }
                      if (!filePath.includes("node_modules"))
                        return [
                          3,
                          3
                        ];
                      parsed = parseNodeModulePath(filePath);
                      baseDir = parsed.dir;
                      pkgName2 = parsed.name;
                      subpath = parsed.subpath;
                      pkgPath = path.join(baseDir, pkgName2);
                      return [
                        3,
                        8
                      ];
                    case 3:
                      MODERN_UTILS_PATH = "packages/toolkit/utils";
                      MODERN_UTILS_PATH_REGEX = new RegExp("(.*".concat(MODERN_UTILS_PATH, ")"));
                      match = filePath.match(MODERN_UTILS_PATH_REGEX);
                      if (!match)
                        return [
                          3,
                          4
                        ];
                      _tmp = path.join(match[0], "package.json");
                      return [
                        3,
                        6
                      ];
                    case 4:
                      return [
                        4,
                        pkgUp({
                          cwd: path.dirname(filePath)
                        })
                      ];
                    case 5:
                      _tmp = _state2.sent();
                      _state2.label = 6;
                    case 6:
                      packageJsonPath = _tmp;
                      if (!(packageJsonPath && isSubPath(dependencySearchRoot, packageJsonPath)))
                        return [
                          3,
                          8
                        ];
                      return [
                        4,
                        fse.readJSON(packageJsonPath)
                      ];
                    case 7:
                      packageJson = _state2.sent();
                      pkgPath = baseDir = path.dirname(packageJsonPath);
                      subpath = path.relative(baseDir, filePath);
                      pkgName2 = packageJson.name;
                      _state2.label = 8;
                    case 8:
                      if (!baseDir) {
                        return [
                          2
                        ];
                      }
                      return [
                        4,
                        Promise.all(_to_consumable_array(reasons.parents).map(function(p) {
                          return resolveTracedPath(base, p);
                        }))
                      ];
                    case 9:
                      parents = _state2.sent();
                      tracedFile2 = {
                        path: filePath,
                        parents,
                        isDirectDep: parents.some(function(parent) {
                          return isSubPath(appDir, parent) && !isSubPath(currentProjectModules, parent);
                        }),
                        subpath,
                        pkgName: pkgName2,
                        pkgPath
                      };
                      return [
                        2,
                        [
                          filePath,
                          tracedFile2
                        ]
                      ];
                  }
                });
              });
              return function(_2) {
                return _ref2.apply(this, arguments);
              };
            }())).then(function(r) {
              return r.filter(Boolean);
            })
          ];
        case 3:
          tracedFiles = _.apply(Object, [
            _state.sent()
          ]);
          tracedPackages = {};
          _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
          _state.label = 4;
        case 4:
          _state.trys.push([
            4,
            11,
            12,
            13
          ]);
          _iterator = Object.values(tracedFiles)[Symbol.iterator]();
          _state.label = 5;
        case 5:
          if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done))
            return [
              3,
              10
            ];
          tracedFile = _step.value;
          pkgName = tracedFile.pkgName;
          tracedPackage = tracedPackages[pkgName];
          return [
            4,
            readPackageJSON(tracedFile.pkgPath, {
              cache: true
            }).catch(function() {
            })
          ];
        case 6:
          pkgJSON = _state.sent();
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
          tracedPackageVersion = tracedPackage.versions[pkgJSON.version];
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
          shouldCopyWholePackage = copyWholePackage === null || copyWholePackage === void 0 ? void 0 : copyWholePackage(pkgName);
          if (!(tracedFile.path.startsWith(tracedFile.pkgPath) && // Merged package files are based on the version, not on paths, to handle some boundary cases
          tracedPackageVersion.pkgJSON.version === tracedFile.pkgVersion))
            return [
              3,
              9
            ];
          if (!shouldCopyWholePackage)
            return [
              3,
              8
            ];
          return [
            4,
            readDirRecursive(tracedFile.pkgPath)
          ];
        case 7:
          allFiles = _state.sent();
          (_tracedPackageVersion_files = tracedPackageVersion.files).push.apply(_tracedPackageVersion_files, _to_consumable_array(allFiles));
          return [
            3,
            9
          ];
        case 8:
          tracedPackageVersion.files.push(tracedFile.path);
          _state.label = 9;
        case 9:
          _iteratorNormalCompletion = true;
          return [
            3,
            5
          ];
        case 10:
          return [
            3,
            13
          ];
        case 11:
          err = _state.sent();
          _didIteratorError = true;
          _iteratorError = err;
          return [
            3,
            13
          ];
        case 12:
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
        case 13:
          multiVersionPkgs = {};
          singleVersionPackages = [];
          _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
          try {
            for (_iterator1 = Object.values(tracedPackages)[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
              tracedPackage1 = _step1.value;
              versions = Object.keys(tracedPackage1.versions);
              if (versions.length === 1) {
                singleVersionPackages.push(tracedPackage1.name);
                continue;
              }
              multiVersionPkgs[tracedPackage1.name] = {};
              _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = void 0;
              try {
                for (_iterator2 = versions[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  version = _step2.value;
                  multiVersionPkgs[tracedPackage1.name][version] = findPackageParents(tracedPackage1, version, tracedFiles);
                }
              } catch (err2) {
                _didIteratorError2 = true;
                _iteratorError2 = err2;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          } catch (err2) {
            _didIteratorError1 = true;
            _iteratorError1 = err2;
          } finally {
            try {
              if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
              }
            } finally {
              if (_didIteratorError1) {
                throw _iteratorError1;
              }
            }
          }
          return [
            4,
            Promise.all(singleVersionPackages.map(function(pkgName2) {
              var pkg = tracedPackages[pkgName2];
              var version2 = Object.keys(pkg.versions)[0];
              return writePackage({
                pkg,
                version: version2,
                projectDir: serverRootDir
              });
            }))
          ];
        case 14:
          _state.sent();
          return [
            4,
            readPackageJSON(serverRootDir).catch(function() {
              return {};
            })
          ];
        case 15:
          projectPkgJson = _state.sent();
          _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = void 0;
          _state.label = 16;
        case 16:
          _state.trys.push([
            16,
            21,
            22,
            23
          ]);
          _loop = function() {
            var _step_value, pkgName2, pkgVersions, versionEntires, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step_value1, version2, parentPkgs, pkg, pkgDestPath, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, parentPkg, parentPkgName, err2, err2;
            return _ts_generator(this, function(_state2) {
              switch (_state2.label) {
                case 0:
                  _step_value = _sliced_to_array(_step3.value, 2), pkgName2 = _step_value[0], pkgVersions = _step_value[1];
                  versionEntires = Object.entries(pkgVersions).sort(function(param2, param1) {
                    var _param = _sliced_to_array(param2, 2), v1 = _param[0], p1 = _param[1], _param1 = _sliced_to_array(param1, 2), v2 = _param1[0], p2 = _param1[1];
                    var _tracedPackages_pkgName_versions_v1, _tracedPackages_pkgName_versions, _tracedPackages_pkgName, _tracedPackages_pkgName_versions_v2, _tracedPackages_pkgName_versions1, _tracedPackages_pkgName1;
                    var shouldHoist1 = (_tracedPackages_pkgName = tracedPackages[pkgName2]) === null || _tracedPackages_pkgName === void 0 ? void 0 : (_tracedPackages_pkgName_versions = _tracedPackages_pkgName.versions) === null || _tracedPackages_pkgName_versions === void 0 ? void 0 : (_tracedPackages_pkgName_versions_v1 = _tracedPackages_pkgName_versions[v1]) === null || _tracedPackages_pkgName_versions_v1 === void 0 ? void 0 : _tracedPackages_pkgName_versions_v1.isDirectDep;
                    var shouldHoist2 = (_tracedPackages_pkgName1 = tracedPackages[pkgName2]) === null || _tracedPackages_pkgName1 === void 0 ? void 0 : (_tracedPackages_pkgName_versions1 = _tracedPackages_pkgName1.versions) === null || _tracedPackages_pkgName_versions1 === void 0 ? void 0 : (_tracedPackages_pkgName_versions_v2 = _tracedPackages_pkgName_versions1[v2]) === null || _tracedPackages_pkgName_versions_v2 === void 0 ? void 0 : _tracedPackages_pkgName_versions_v2.isDirectDep;
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
                  _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = void 0;
                  _state2.label = 1;
                case 1:
                  _state2.trys.push([
                    1,
                    14,
                    15,
                    16
                  ]);
                  _iterator4 = versionEntires[Symbol.iterator]();
                  _state2.label = 2;
                case 2:
                  if (!!(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done))
                    return [
                      3,
                      13
                    ];
                  _step_value1 = _sliced_to_array(_step4.value, 2), version2 = _step_value1[0], parentPkgs = _step_value1[1];
                  pkg = tracedPackages[pkgName2];
                  pkgDestPath = ".modernjs/".concat(pkgName2, "@").concat(version2, "/node_modules/").concat(pkgName2);
                  return [
                    4,
                    writePackage({
                      pkg,
                      version: version2,
                      projectDir: serverRootDir,
                      _pkgPath: pkgDestPath
                    })
                  ];
                case 3:
                  _state2.sent();
                  return [
                    4,
                    linkPackage(pkgDestPath, "".concat(pkgName2), serverRootDir)
                  ];
                case 4:
                  _state2.sent();
                  _iteratorNormalCompletion12 = true, _didIteratorError12 = false, _iteratorError12 = void 0;
                  _state2.label = 5;
                case 5:
                  _state2.trys.push([
                    5,
                    10,
                    11,
                    12
                  ]);
                  _iterator12 = parentPkgs[Symbol.iterator]();
                  _state2.label = 6;
                case 6:
                  if (!!(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done))
                    return [
                      3,
                      9
                    ];
                  parentPkg = _step12.value;
                  parentPkgName = parentPkg.replace(/@[^@]+$/, "");
                  return [
                    4,
                    multiVersionPkgs[parentPkgName] ? linkPackage(pkgDestPath, ".modernjs/".concat(parentPkg, "/node_modules/").concat(pkgName2), serverRootDir) : linkPackage(pkgDestPath, "".concat(parentPkgName, "/node_modules/").concat(pkgName2), serverRootDir)
                  ];
                case 7:
                  _state2.sent();
                  _state2.label = 8;
                case 8:
                  _iteratorNormalCompletion12 = true;
                  return [
                    3,
                    6
                  ];
                case 9:
                  return [
                    3,
                    12
                  ];
                case 10:
                  err2 = _state2.sent();
                  _didIteratorError12 = true;
                  _iteratorError12 = err2;
                  return [
                    3,
                    12
                  ];
                case 11:
                  try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
                      _iterator12.return();
                    }
                  } finally {
                    if (_didIteratorError12) {
                      throw _iteratorError12;
                    }
                  }
                  return [
                    7
                  ];
                case 12:
                  _iteratorNormalCompletion4 = true;
                  return [
                    3,
                    2
                  ];
                case 13:
                  return [
                    3,
                    16
                  ];
                case 14:
                  err2 = _state2.sent();
                  _didIteratorError4 = true;
                  _iteratorError4 = err2;
                  return [
                    3,
                    16
                  ];
                case 15:
                  try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                      _iterator4.return();
                    }
                  } finally {
                    if (_didIteratorError4) {
                      throw _iteratorError4;
                    }
                  }
                  return [
                    7
                  ];
                case 16:
                  return [
                    2
                  ];
              }
            });
          };
          _iterator3 = Object.entries(multiVersionPkgs)[Symbol.iterator]();
          _state.label = 17;
        case 17:
          if (!!(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done))
            return [
              3,
              20
            ];
          return [
            5,
            _ts_values(_loop())
          ];
        case 18:
          _state.sent();
          _state.label = 19;
        case 19:
          _iteratorNormalCompletion3 = true;
          return [
            3,
            17
          ];
        case 20:
          return [
            3,
            23
          ];
        case 21:
          err = _state.sent();
          _didIteratorError3 = true;
          _iteratorError3 = err;
          return [
            3,
            23
          ];
        case 22:
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
          return [
            7
          ];
        case 23:
          outputPkgPath = path.join(serverRootDir, "package.json");
          newPkgJson = {
            name: "".concat(projectPkgJson.name || "modernjs-project", "-prod"),
            version: projectPkgJson.version || "0.0.0",
            private: true,
            type: projectPkgJson.type || "commonjs",
            dependencies: Object.fromEntries(_to_consumable_array(Object.values(tracedPackages).map(function(pkg) {
              return [
                pkg.name,
                Object.keys(pkg.versions)[0]
              ];
            })).sort(function(param2, param1) {
              var _param = _sliced_to_array(param2, 1), a = _param[0], _param1 = _sliced_to_array(param1, 1), b = _param1[0];
              return a.localeCompare(b);
            }))
          };
          finalPkgJson = (modifyPackageJson === null || modifyPackageJson === void 0 ? void 0 : modifyPackageJson(newPkgJson)) || newPkgJson;
          return [
            4,
            fse.writeJSON(outputPkgPath, finalPkgJson)
          ];
        case 24:
          _state.sent();
          return [
            2
          ];
      }
    });
  });
  return function handleDependencies2(_) {
    return _ref.apply(this, arguments);
  };
}();
export {
  handleDependencies,
  nodeFileTrace
};
