import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { cloneDeep } from "@modern-js/utils/lodash";
import * as templates from "./code/templates";
import { isPageComponentFile } from "./code/utils";
import { modifyEntrypoints } from "./entry";
var originEntrypoints = [];
function handleModifyEntrypoints(api, entrypoints) {
  return _handleModifyEntrypoints.apply(this, arguments);
}
function _handleModifyEntrypoints() {
  _handleModifyEntrypoints = _async_to_generator(function(api, entrypoints) {
    var config;
    return _ts_generator(this, function(_state) {
      config = api.useResolvedConfigContext();
      return [
        2,
        modifyEntrypoints(entrypoints, config)
      ];
    });
  });
  return _handleModifyEntrypoints.apply(this, arguments);
}
function handleGeneratorEntryCode(api, entrypoints) {
  return _handleGeneratorEntryCode.apply(this, arguments);
}
function _handleGeneratorEntryCode() {
  _handleGeneratorEntryCode = _async_to_generator(function(api, entrypoints) {
    var appContext, internalDirectory, resolvedConfig, _ref, generatorRegisterCode, generateCode;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          appContext = api.useAppContext();
          internalDirectory = api.useAppContext().internalDirectory;
          resolvedConfig = api.useResolvedConfigContext();
          return [
            4,
            import("./code")
          ];
        case 1:
          _ref = _state.sent(), generatorRegisterCode = _ref.generatorRegisterCode, generateCode = _ref.generateCode;
          originEntrypoints = cloneDeep(entrypoints);
          return [
            4,
            generateCode(appContext, resolvedConfig, entrypoints, api)
          ];
        case 2:
          _state.sent();
          return [
            4,
            Promise.all(entrypoints.map(function() {
              var _ref2 = _async_to_generator(function(entrypoint) {
                var _entrypoint_fileSystemRoutes, _tmp;
                return _ts_generator(this, function(_state2) {
                  switch (_state2.label) {
                    case 0:
                      if (!(entrypoint.nestedRoutesEntry || entrypoint.pageRoutesEntry))
                        return [
                          3,
                          2
                        ];
                      _tmp = [
                        internalDirectory,
                        entrypoint.entryName
                      ];
                      return [
                        4,
                        templates.runtimeGlobalContext({
                          metaName: appContext.metaName,
                          srcDirectory: appContext.srcDirectory,
                          nestedRoutesEntry: entrypoint.nestedRoutesEntry,
                          internalSrcAlias: appContext.internalSrcAlias,
                          globalApp: (_entrypoint_fileSystemRoutes = entrypoint.fileSystemRoutes) === null || _entrypoint_fileSystemRoutes === void 0 ? void 0 : _entrypoint_fileSystemRoutes.globalApp
                        })
                      ];
                    case 1:
                      generatorRegisterCode.apply(void 0, _tmp.concat([
                        _state2.sent()
                      ]));
                      _state2.label = 2;
                    case 2:
                      return [
                        2
                      ];
                  }
                });
              });
              return function(entrypoint) {
                return _ref2.apply(this, arguments);
              };
            }()))
          ];
        case 3:
          _state.sent();
          return [
            2,
            entrypoints
          ];
      }
    });
  });
  return _handleGeneratorEntryCode.apply(this, arguments);
}
function handleFileChange(api, e) {
  return _handleFileChange.apply(this, arguments);
}
function _handleFileChange() {
  _handleFileChange = _async_to_generator(function(api, e) {
    var appContext, appDirectory, entrypoints, filename, eventType, nestedRouteEntries, pagesDir, isPageFile, absoluteFilePath, isRouteComponent, resolvedConfig, generateCode, entrypoints1;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          appContext = api.useAppContext();
          appDirectory = appContext.appDirectory, entrypoints = appContext.entrypoints;
          filename = e.filename, eventType = e.eventType;
          nestedRouteEntries = entrypoints.map(function(point) {
            return point.nestedRoutesEntry;
          }).filter(Boolean);
          pagesDir = entrypoints.map(function(point) {
            return point.entry;
          }).filter(function(entry) {
            return entry && !path.extname(entry);
          }).concat(nestedRouteEntries);
          isPageFile = function(name) {
            return pagesDir.some(function(pageDir) {
              return name.includes(pageDir);
            });
          };
          absoluteFilePath = path.resolve(appDirectory, filename);
          isRouteComponent = isPageFile(absoluteFilePath) && isPageComponentFile(absoluteFilePath);
          if (!(isRouteComponent && (eventType === "add" || eventType === "unlink")))
            return [
              3,
              3
            ];
          resolvedConfig = api.useResolvedConfigContext();
          return [
            4,
            import("./code")
          ];
        case 1:
          generateCode = _state.sent().generateCode;
          entrypoints1 = cloneDeep(originEntrypoints);
          return [
            4,
            generateCode(appContext, resolvedConfig, entrypoints1, api)
          ];
        case 2:
          _state.sent();
          _state.label = 3;
        case 3:
          return [
            2
          ];
      }
    });
  });
  return _handleFileChange.apply(this, arguments);
}
export {
  handleFileChange,
  handleGeneratorEntryCode,
  handleModifyEntrypoints
};
