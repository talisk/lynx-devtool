import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { fs } from "@modern-js/utils";
import { ENTRY_BOOTSTRAP_FILE_NAME, ENTRY_POINT_FILE_NAME, ENTRY_POINT_REGISTER_FILE_NAME, ENTRY_POINT_RUNTIME_GLOBAL_CONTEXT_FILE_NAME, ENTRY_POINT_RUNTIME_REGISTER_FILE_NAME, ENTRY_SERVER_BOOTSTRAP_FILE_NAME, INDEX_FILE_NAME, SERVER_ENTRY_POINT_FILE_NAME } from "./constants";
import * as template from "./template";
import * as serverTemplate from "./template.server";
function getSSRMode(entry, config) {
  var _config_server = config.server, ssr = _config_server.ssr, ssrByEntries = _config_server.ssrByEntries;
  if (config.output.ssg) {
    return "string";
  }
  return checkSSRMode((ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[entry]) || ssr);
  function checkSSRMode(ssr2) {
    if (!ssr2) {
      return false;
    }
    if (typeof ssr2 === "boolean") {
      return ssr2 ? "string" : false;
    }
    return ssr2.mode === "stream" ? "stream" : "string";
  }
}
var generateCode = function() {
  var _ref = _async_to_generator(function(entrypoints, appContext, config, onCollectRuntimePlugins) {
    var mountId, enableAsyncEntry, runtimeConfigFile, internalDirectory, internalSrcAlias, metaName, srcDirectory;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          mountId = config.html.mountId;
          enableAsyncEntry = config.source.enableAsyncEntry;
          runtimeConfigFile = appContext.runtimeConfigFile, internalDirectory = appContext.internalDirectory, internalSrcAlias = appContext.internalSrcAlias, metaName = appContext.metaName, srcDirectory = appContext.srcDirectory;
          return [
            4,
            Promise.all(entrypoints.map(function() {
              var _ref2 = _async_to_generator(function(entrypoint) {
                var entryName, isAutoMount, entry, customEntry, customBootstrap, customServerEntry, _ref3, runtimePlugins, indexCode, indexFile, ssrMode, bootstrapFile, bootstrapServerFile, indexServerCode, indexServerFile, registerCode, registerFile, registerRuntimeCode, registerRuntimeFile, contextCode, contextFile;
                return _ts_generator(this, function(_state2) {
                  switch (_state2.label) {
                    case 0:
                      entryName = entrypoint.entryName, isAutoMount = entrypoint.isAutoMount, entry = entrypoint.entry, customEntry = entrypoint.customEntry, customBootstrap = entrypoint.customBootstrap, customServerEntry = entrypoint.customServerEntry;
                      return [
                        4,
                        onCollectRuntimePlugins({
                          entrypoint,
                          plugins: []
                        })
                      ];
                    case 1:
                      _ref3 = _state2.sent(), runtimePlugins = _ref3.plugins;
                      if (isAutoMount) {
                        indexCode = template.index({
                          srcDirectory,
                          internalSrcAlias,
                          metaName,
                          entry,
                          entryName,
                          customEntry,
                          customBootstrap,
                          mountId
                        });
                        indexFile = path.resolve(internalDirectory, "./".concat(entryName, "/").concat(ENTRY_POINT_FILE_NAME));
                        fs.outputFileSync(indexFile, indexCode, "utf8");
                        ssrMode = getSSRMode(entryName, config);
                        if (enableAsyncEntry) {
                          bootstrapFile = path.resolve(internalDirectory, "./".concat(entryName, "/").concat(ENTRY_BOOTSTRAP_FILE_NAME));
                          fs.outputFileSync(bootstrapFile, 'import(/* webpackChunkName: "async-'.concat(entryName, `" */ './`).concat(INDEX_FILE_NAME, "');"), "utf8");
                          bootstrapServerFile = path.resolve(internalDirectory, "./".concat(entryName, "/").concat(ENTRY_SERVER_BOOTSTRAP_FILE_NAME));
                          if (ssrMode) {
                            fs.outputFileSync(bootstrapServerFile, "export const requestHandler = import('./".concat(SERVER_ENTRY_POINT_FILE_NAME, "').then((m) => m.requestHandler)"), "utf8");
                          }
                        }
                        if (ssrMode) {
                          indexServerCode = serverTemplate.serverIndex({
                            entry,
                            entryName,
                            internalSrcAlias,
                            metaName,
                            mode: ssrMode,
                            customServerEntry,
                            srcDirectory
                          });
                          indexServerFile = path.resolve(internalDirectory, "./".concat(entryName, "/").concat(SERVER_ENTRY_POINT_FILE_NAME));
                          fs.outputFileSync(indexServerFile, indexServerCode, "utf8");
                        }
                        registerCode = template.register();
                        registerFile = path.resolve(internalDirectory, "./".concat(entryName, "/").concat(ENTRY_POINT_REGISTER_FILE_NAME));
                        fs.outputFileSync(registerFile, registerCode, "utf8");
                        registerRuntimeCode = template.runtimeRegister({
                          entryName,
                          srcDirectory,
                          internalSrcAlias,
                          metaName,
                          runtimeConfigFile,
                          runtimePlugins
                        });
                        registerRuntimeFile = path.resolve(internalDirectory, "./".concat(entryName, "/").concat(ENTRY_POINT_RUNTIME_REGISTER_FILE_NAME));
                        fs.outputFileSync(registerRuntimeFile, registerRuntimeCode, "utf8");
                        contextCode = template.runtimeGlobalContext({
                          srcDirectory,
                          internalSrcAlias,
                          metaName,
                          entry,
                          customEntry
                        });
                        contextFile = path.resolve(internalDirectory, "./".concat(entryName, "/").concat(ENTRY_POINT_RUNTIME_GLOBAL_CONTEXT_FILE_NAME));
                        fs.outputFileSync(contextFile, contextCode, "utf8");
                      }
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
        case 1:
          _state.sent();
          return [
            2
          ];
      }
    });
  });
  return function generateCode2(entrypoints, appContext, config, onCollectRuntimePlugins) {
    return _ref.apply(this, arguments);
  };
}();
export {
  generateCode
};
