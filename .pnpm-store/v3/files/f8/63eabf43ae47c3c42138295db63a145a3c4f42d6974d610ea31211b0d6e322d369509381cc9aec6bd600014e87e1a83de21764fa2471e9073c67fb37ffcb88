import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { SERVER_DIR, requireExistModule } from "@modern-js/utils";
var CACHE_FILENAME = "cache";
function loadCacheConfig(pwd) {
  return _loadCacheConfig.apply(this, arguments);
}
function _loadCacheConfig() {
  _loadCacheConfig = _async_to_generator(function(pwd) {
    var serverCacheFilepath, mod;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          serverCacheFilepath = path.resolve(pwd, SERVER_DIR, CACHE_FILENAME);
          return [
            4,
            requireExistModule(serverCacheFilepath, {
              interop: false
            })
          ];
        case 1:
          mod = _state.sent();
          if (mod === null || mod === void 0 ? void 0 : mod.cacheOption) {
            return [
              2,
              {
                strategy: mod.cacheOption,
                container: mod.customContainer
              }
            ];
          }
          return [
            2,
            void 0
          ];
      }
    });
  });
  return _loadCacheConfig.apply(this, arguments);
}
export {
  loadCacheConfig
};
