import path from "path";
import { SERVER_DIR, requireExistModule } from "@modern-js/utils";
const CACHE_FILENAME = "cache";
async function loadCacheConfig(pwd) {
  const serverCacheFilepath = path.resolve(pwd, SERVER_DIR, CACHE_FILENAME);
  const mod = await requireExistModule(serverCacheFilepath, {
    interop: false
  });
  if (mod === null || mod === void 0 ? void 0 : mod.cacheOption) {
    return {
      strategy: mod.cacheOption,
      container: mod.customContainer
    };
  }
  return void 0;
}
export {
  loadCacheConfig
};
