import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { fs, findExists, formatImportPath, getEntryOptions, isSSGEntry, slash } from "@modern-js/utils";
import { ROUTE_MODULES } from "@modern-js/utils/universal/constants";
import { APP_CONFIG_NAME, APP_INIT_EXPORTED, TEMP_LOADERS_DIR } from "../constants";
import { getPathWithoutExt, getServerLoadersFile, parseModule, replaceWithAlias } from "./utils";
var routesForServer = function(param) {
  var routesForServerLoaderMatches = param.routesForServerLoaderMatches;
  var loaders = [];
  var actions = [];
  var loadersMap = {};
  var traverseRouteTree = function(route2) {
    var children;
    if ("children" in route2 && route2.children) {
      var _route_children;
      children = route2 === null || route2 === void 0 ? void 0 : (_route_children = route2.children) === null || _route_children === void 0 ? void 0 : _route_children.map(traverseRouteTree);
    }
    var loader;
    var action;
    if (route2.type === "nested") {
      if (route2.loader || route2.data) {
        loaders.push(route2.loader);
        var loaderId = loaders.length - 1;
        loader = "loader_".concat(loaderId);
        var inline = Boolean(route2.data);
        loadersMap[loader] = {
          loaderId,
          routeId: route2.id,
          filePath: route2.data || route2.loader,
          clientData: Boolean(route2.clientData),
          route: route2,
          inline
        };
        if (route2.action) {
          actions.push(route2.action);
          action = "action_".concat(loaders.length - 1);
        }
      }
    }
    var finalRoute = _object_spread_props(_object_spread({}, route2), {
      loader,
      action,
      children
    });
    return finalRoute;
  };
  var routesCode = "\n  export const routes = [\n  ";
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = routesForServerLoaderMatches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;
      if ("type" in route) {
        var keywords = [
          "loader",
          "action"
        ];
        var regs = keywords.map(createMatchReg);
        var newRoute = traverseRouteTree(route);
        var routeStr = JSON.stringify(newRoute, null, 2);
        routesCode += regs.reduce(function(acc, reg) {
          return acc.replace(reg, "$1$2");
        }, routeStr).replace(/\\"/g, '"');
      } else {
        routesCode += "".concat(JSON.stringify(route, null, 2));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  routesCode += "\n];";
  var importLoadersCode = "";
  var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
  try {
    for (var _iterator1 = Object.entries(loadersMap)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
      var _step_value = _sliced_to_array(_step1.value, 2), key = _step_value[0], loaderInfo = _step_value[1];
      if (loaderInfo.inline) {
        var route1 = loaderInfo.route;
        if (route1.action) {
          importLoadersCode += "import { loader as ".concat(key, ", action as action_").concat(loaderInfo.loaderId, ' } from "').concat(slash(loaderInfo.filePath), '";\n');
        } else {
          importLoadersCode += "import { loader as ".concat(key, ' } from "').concat(slash(loaderInfo.filePath), '";\n');
        }
      } else {
        importLoadersCode += "import ".concat(key, ' from "').concat(slash(loaderInfo.filePath), '";\n');
      }
    }
  } catch (err) {
    _didIteratorError1 = true;
    _iteratorError1 = err;
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
  return "\n    ".concat(importLoadersCode, "\n    ").concat(routesCode, "\n  ");
};
var createMatchReg = function(keyword) {
  return new RegExp('("'.concat(keyword, '":\\s)"([^\n]+)"'), "g");
};
var fileSystemRoutes = function() {
  var _ref = _async_to_generator(function(param) {
    var metaName, routes, ssrMode, nestedRoutesEntry, entryName, internalDirectory, _param_splitRouteChunks, splitRouteChunks, components, loadings, errors, loaders, loadersMap, configs, configsMap, loadersMapFile, importLazyCode, rootLayoutCode, getDataLoaderPath, traverseRouteTree, routeComponentsCode, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, newRoute, routeStr, keywords, regs, newRouteStr, component, finalRoute, keywords1, routeStr1, regs1, newRouteStr1, importLoadingCode, importComponentsCode, importErrorComponentsCode, importLoadersCode, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, _step_value, key, loaderInfo, route1, importConfigsCode, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step_value1, key1, configPath, importRuntimeRouterCode, routeModulesCode;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          metaName = param.metaName, routes = param.routes, ssrMode = param.ssrMode, nestedRoutesEntry = param.nestedRoutesEntry, entryName = param.entryName, internalDirectory = param.internalDirectory, _param_splitRouteChunks = param.splitRouteChunks, splitRouteChunks = _param_splitRouteChunks === void 0 ? true : _param_splitRouteChunks;
          components = [];
          loadings = [];
          errors = [];
          loaders = [];
          loadersMap = {};
          configs = [];
          configsMap = {};
          loadersMapFile = path.join(internalDirectory, entryName, TEMP_LOADERS_DIR, "map.json");
          importLazyCode = '\n    import { lazy } from "react";\n    import loadable, { lazy as loadableLazy } from "@'.concat(metaName, '/runtime/loadable"\n  ');
          rootLayoutCode = "";
          getDataLoaderPath = function(param2) {
            var loaderId = param2.loaderId, clientData = param2.clientData, action = param2.action, inline = param2.inline, routeId = param2.routeId, inValidSSRRoute = param2.inValidSSRRoute;
            if (!ssrMode) {
              return "";
            }
            var clientDataStr = clientData ? "&clientData=".concat(clientData) : "";
            var retain = inValidSSRRoute !== null && inValidSSRRoute !== void 0 ? inValidSSRRoute : false;
            if (nestedRoutesEntry) {
              return "?loaderId=".concat(loaderId).concat(clientDataStr, "&action=").concat(action ? slash(action) : action, "&inline=").concat(inline, "&routeId=").concat(routeId, "&retain=").concat(retain);
            }
            return "";
          };
          traverseRouteTree = function(route2) {
            var children;
            if ("children" in route2 && route2.children) {
              var _route_children;
              children = route2 === null || route2 === void 0 ? void 0 : (_route_children = route2.children) === null || _route_children === void 0 ? void 0 : _route_children.map(traverseRouteTree);
            }
            var loading;
            var error;
            var loader;
            var action;
            var config;
            var component2 = "";
            var lazyImport = null;
            if (route2.type === "nested") {
              if (route2.loading) {
                loadings.push(route2.loading);
                loading = "loading_".concat(loadings.length - 1);
              }
              if (route2.error) {
                errors.push(route2.error);
                error = "error_".concat(errors.length - 1);
              }
              if (route2.loader || route2.data) {
                loaders.push(route2.loader);
                var loaderId = loaders.length - 1;
                loader = "loader_".concat(loaderId);
                var inline = Boolean(route2.data);
                loadersMap[loader] = {
                  loaderId,
                  routeId: route2.id,
                  inValidSSRRoute: route2.inValidSSRRoute,
                  filePath: route2.data || route2.loader,
                  clientData: Boolean(route2.clientData),
                  route: route2,
                  inline
                };
                loader = "loader_".concat(loaderId);
                if (route2.action) {
                  action = "action_".concat(loaderId);
                }
              }
              if (typeof route2.config === "string") {
                configs.push(route2.config);
                var configId = configs.length - 1;
                config = "config_".concat(configId);
                configsMap[config] = route2.config;
              }
              if (route2._component) {
                if (splitRouteChunks) {
                  if (route2.isRoot) {
                    lazyImport = "() => import('".concat(route2._component, `').then(routeModule => handleRouteModule(routeModule, "`).concat(route2.id, '")).catch(handleRouteModuleError) ');
                    rootLayoutCode = "import RootLayout from '".concat(route2._component, "'");
                    component2 = "RootLayout";
                  } else if (ssrMode === "string") {
                    lazyImport = '() => import(/* webpackChunkName: "'.concat(route2.id, `" */  '`).concat(route2._component, `').then(routeModule => handleRouteModule(routeModule, "`).concat(route2.id, '")).catch(handleRouteModuleError) ');
                    component2 = "loadable(".concat(lazyImport, ")");
                  } else {
                    lazyImport = '() => import(/* webpackChunkName: "'.concat(route2.id, `" */  '`).concat(route2._component, `').then(routeModule => handleRouteModule(routeModule, "`).concat(route2.id, '")).catch(handleRouteModuleError) ');
                    component2 = "lazy(".concat(lazyImport, ")");
                  }
                } else if (ssrMode === "string") {
                  components.push(route2._component);
                  component2 = "component_".concat(components.length - 1);
                } else {
                  lazyImport = `() => import(/* webpackMode: "eager" */  '`.concat(route2._component, `').then(routeModule => handleRouteModule(routeModule, "`).concat(route2.id, '")).catch(handleRouteModuleError) ');
                  component2 = "lazy(".concat(lazyImport, ")");
                }
              }
            } else if (route2._component) {
              if (splitRouteChunks) {
                lazyImport = "() => import('".concat(route2._component, "')");
                component2 = "loadable(".concat(lazyImport, ")");
              } else {
                components.push(route2._component);
                component2 = "component_".concat(components.length - 1);
              }
            }
            var finalRoute2 = _object_spread_props(_object_spread({}, route2), {
              lazyImport,
              loading,
              loader,
              action,
              config,
              error,
              children
            });
            if (route2._component) {
              finalRoute2.component = component2;
            }
            if (route2.type === "nested" && route2._component && (route2.loader || route2.data)) {
              finalRoute2.shouldRevalidate = 'createShouldRevalidate("'.concat(route2.id, '")');
            }
            return finalRoute2;
          };
          routeComponentsCode = "\n    export const routes = [\n  ";
          _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
          try {
            for (_iterator = routes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              route = _step.value;
              if ("type" in route) {
                newRoute = traverseRouteTree(route);
                routeStr = JSON.stringify(newRoute, null, 2);
                keywords = [
                  "component",
                  "lazyImport",
                  "shouldRevalidate",
                  "loader",
                  "action",
                  "loading",
                  "error",
                  "config"
                ];
                regs = keywords.map(createMatchReg);
                newRouteStr = regs.reduce(function(acc, reg) {
                  return acc.replace(reg, "$1$2");
                }, routeStr).replace(/"(RootLayout)"/g, "$1").replace(/\\"/g, '"');
                routeComponentsCode += "".concat(newRouteStr, ",");
              } else {
                component = "loadable(() => import('".concat(route._component, "'))");
                finalRoute = _object_spread_props(_object_spread({}, route), {
                  component
                });
                keywords1 = [
                  "component",
                  "lazyImport"
                ];
                routeStr1 = JSON.stringify(finalRoute, null, 2);
                regs1 = keywords1.map(createMatchReg);
                newRouteStr1 = regs1.reduce(function(acc, reg) {
                  return acc.replace(reg, "$1$2");
                }, routeStr1).replace(/\\"/g, '"');
                routeComponentsCode += "".concat(newRouteStr1, ",");
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
          routeComponentsCode += "\n];";
          importLoadingCode = loadings.map(function(loading, index) {
            return "import loading_".concat(index, " from '").concat(loading, "';\n");
          }).join("");
          importComponentsCode = components.map(function(component2, index) {
            return "import component_".concat(index, " from '").concat(component2, "';\n");
          }).join("");
          importErrorComponentsCode = errors.map(function(error, index) {
            return "import error_".concat(index, " from '").concat(error, "';\n");
          }).join("");
          importLoadersCode = "";
          _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
          try {
            for (_iterator1 = Object.entries(loadersMap)[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
              _step_value = _sliced_to_array(_step1.value, 2), key = _step_value[0], loaderInfo = _step_value[1];
              if (loaderInfo.inline) {
                route1 = loaderInfo.route;
                if (route1.action) {
                  importLoadersCode += "import { loader as ".concat(key, ", action as action_").concat(loaderInfo.loaderId, ' } from "').concat(slash(loaderInfo.filePath)).concat(getDataLoaderPath({
                    loaderId: key,
                    clientData: loaderInfo.clientData,
                    action: route1.action,
                    inline: loaderInfo.inline,
                    routeId: loaderInfo.routeId,
                    inValidSSRRoute: loaderInfo.inValidSSRRoute
                  }), '";\n');
                } else {
                  importLoadersCode += "import { loader as ".concat(key, ' } from "').concat(slash(loaderInfo.filePath)).concat(getDataLoaderPath({
                    loaderId: key,
                    clientData: loaderInfo.clientData,
                    action: false,
                    inline: loaderInfo.inline,
                    routeId: route1.id,
                    inValidSSRRoute: loaderInfo.inValidSSRRoute
                  }), '";\n');
                }
              } else {
                importLoadersCode += "import ".concat(key, ' from "').concat(slash(loaderInfo.filePath)).concat(getDataLoaderPath({
                  loaderId: key,
                  clientData: loaderInfo.clientData,
                  action: false,
                  inline: loaderInfo.inline,
                  routeId: loaderInfo.routeId,
                  inValidSSRRoute: loaderInfo.inValidSSRRoute
                }), '";\n');
              }
            }
          } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
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
          importConfigsCode = "";
          _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = void 0;
          try {
            for (_iterator2 = Object.entries(configsMap)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _step_value1 = _sliced_to_array(_step2.value, 2), key1 = _step_value1[0], configPath = _step_value1[1];
              importConfigsCode += "import * as ".concat(key1, ' from "').concat(slash(configPath), '";\n');
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
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
          return [
            4,
            fs.ensureFile(loadersMapFile)
          ];
        case 1:
          _state.sent();
          return [
            4,
            fs.writeJSON(loadersMapFile, loadersMap)
          ];
        case 2:
          _state.sent();
          importRuntimeRouterCode = "\n    import { createShouldRevalidate, handleRouteModule,  handleRouteModuleError} from '@".concat(metaName, "/runtime/router';\n  ");
          routeModulesCode = "\n    if(typeof document !== 'undefined'){\n      window.".concat(ROUTE_MODULES, " = {}\n    }\n  ");
          return [
            2,
            "\n    ".concat(importLazyCode, "\n    ").concat(importComponentsCode, "\n    ").concat(importRuntimeRouterCode, "\n    ").concat(rootLayoutCode, "\n    ").concat(importLoadingCode, "\n    ").concat(importErrorComponentsCode, "\n    ").concat(importLoadersCode, "\n    ").concat(importConfigsCode, "\n    ").concat(routeModulesCode, "\n    ").concat(routeComponentsCode, "\n  ")
          ];
      }
    });
  });
  return function fileSystemRoutes2(_) {
    return _ref.apply(this, arguments);
  };
}();
function ssrLoaderCombinedModule(entrypoints, entrypoint, config, appContext) {
  var entryName = entrypoint.entryName, isMainEntry = entrypoint.isMainEntry;
  var packageName = appContext.packageName, internalDirectory = appContext.internalDirectory;
  var ssr = getEntryOptions(entryName, isMainEntry, config.server.ssr, config.server.ssrByEntries, packageName);
  var ssg = isSSGEntry(config, entryName, entrypoints);
  if (entrypoint.nestedRoutesEntry && (ssr || ssg)) {
    var serverLoaderRuntime = require.resolve("@modern-js/plugin-data-loader/runtime");
    var serverLoadersFile = getServerLoadersFile(internalDirectory, entryName);
    var combinedModule = 'export * from "'.concat(slash(serverLoaderRuntime), '"; export * from "').concat(slash(serverLoadersFile), '"');
    if (!config.source.enableAsyncEntry) {
      return combinedModule;
    }
    return '\n    async function loadModules() {\n      const [moduleA, moduleB] = await Promise.all([\n        import("'.concat(slash(serverLoaderRuntime), '"),\n        import("').concat(slash(serverLoadersFile), '")\n      ]);\n\n      return {\n        ...moduleA,\n        ...moduleB\n      };\n    }\n\n    export { loadModules };\n    ');
  }
  return null;
}
var runtimeGlobalContext = function() {
  var _ref = _async_to_generator(function(param) {
    var metaName, srcDirectory, nestedRoutesEntry, internalSrcAlias, globalApp, imports, rootLayoutPath, rootLayoutFile, rootLayoutBuffer, rootLayout, _ref2, moduleExports, hasAppConfig, hasAppInit, layoutPath;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          metaName = param.metaName, srcDirectory = param.srcDirectory, nestedRoutesEntry = param.nestedRoutesEntry, internalSrcAlias = param.internalSrcAlias, globalApp = param.globalApp;
          imports = [
            "import { setGlobalContext } from '@".concat(metaName, "/runtime/context';")
          ];
          if (!nestedRoutesEntry)
            return [
              3,
              4
            ];
          rootLayoutPath = path.join(nestedRoutesEntry, "layout");
          rootLayoutFile = findExists([
            ".js",
            ".ts",
            ".jsx",
            ".tsx"
          ].map(function(ext) {
            return "".concat(rootLayoutPath).concat(ext);
          }));
          if (!rootLayoutFile)
            return [
              3,
              3
            ];
          return [
            4,
            fs.readFile(rootLayoutFile)
          ];
        case 1:
          rootLayoutBuffer = _state.sent();
          rootLayout = rootLayoutBuffer.toString();
          return [
            4,
            parseModule({
              source: rootLayout.toString(),
              filename: rootLayoutFile
            })
          ];
        case 2:
          _ref2 = _sliced_to_array.apply(void 0, [
            _state.sent(),
            2
          ]), moduleExports = _ref2[1];
          hasAppConfig = moduleExports.some(function(e) {
            return e.n === APP_CONFIG_NAME;
          });
          hasAppInit = moduleExports.some(function(e) {
            return e.n === APP_INIT_EXPORTED;
          });
          layoutPath = formatImportPath(getPathWithoutExt(replaceWithAlias(srcDirectory, rootLayoutFile, internalSrcAlias)));
          if (hasAppConfig) {
            imports.push("import { config as appConfig } from '".concat(layoutPath, "';"));
          } else {
            imports.push("let appConfig;");
          }
          if (hasAppInit) {
            imports.push("import { init as appInit } from '".concat(layoutPath, "';"));
          } else {
            imports.push("let appInit;");
          }
          _state.label = 3;
        case 3:
          return [
            3,
            5
          ];
        case 4:
          imports.push("let appConfig;");
          imports.push("let appInit;");
          _state.label = 5;
        case 5:
          if (globalApp) {
            imports.push("import layoutApp from '".concat(formatImportPath(globalApp.replace(srcDirectory, internalSrcAlias)), "';"));
          } else {
            imports.push("let layoutApp;");
          }
          return [
            2,
            "".concat(imports.join("\n"), "\n\nimport { routes } from './routes';\n\nsetGlobalContext({\n  layoutApp,\n  routes,\n  appInit,\n  appConfig,\n});")
          ];
      }
    });
  });
  return function runtimeGlobalContext2(_) {
    return _ref.apply(this, arguments);
  };
}();
export {
  fileSystemRoutes,
  routesForServer,
  runtimeGlobalContext,
  ssrLoaderCombinedModule
};
