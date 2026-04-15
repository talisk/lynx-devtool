import path from "path";
import { fs } from "@modern-js/utils";
import { ENTRY_BOOTSTRAP_FILE_NAME, ENTRY_POINT_FILE_NAME, ENTRY_POINT_REGISTER_FILE_NAME, ENTRY_POINT_RUNTIME_GLOBAL_CONTEXT_FILE_NAME, ENTRY_POINT_RUNTIME_REGISTER_FILE_NAME, ENTRY_SERVER_BOOTSTRAP_FILE_NAME, INDEX_FILE_NAME, SERVER_ENTRY_POINT_FILE_NAME } from "./constants";
import * as template from "./template";
import * as serverTemplate from "./template.server";
function getSSRMode(entry, config) {
  const { ssr, ssrByEntries } = config.server;
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
const generateCode = async (entrypoints, appContext, config, onCollectRuntimePlugins) => {
  const { mountId } = config.html;
  const { enableAsyncEntry } = config.source;
  const { runtimeConfigFile, internalDirectory, internalSrcAlias, metaName, srcDirectory } = appContext;
  await Promise.all(entrypoints.map(async (entrypoint) => {
    const { entryName, isAutoMount, entry, customEntry, customBootstrap, customServerEntry } = entrypoint;
    const { plugins: runtimePlugins } = await onCollectRuntimePlugins({
      entrypoint,
      plugins: []
    });
    if (isAutoMount) {
      const indexCode = template.index({
        srcDirectory,
        internalSrcAlias,
        metaName,
        entry,
        entryName,
        customEntry,
        customBootstrap,
        mountId
      });
      const indexFile = path.resolve(internalDirectory, `./${entryName}/${ENTRY_POINT_FILE_NAME}`);
      fs.outputFileSync(indexFile, indexCode, "utf8");
      const ssrMode = getSSRMode(entryName, config);
      if (enableAsyncEntry) {
        const bootstrapFile = path.resolve(internalDirectory, `./${entryName}/${ENTRY_BOOTSTRAP_FILE_NAME}`);
        fs.outputFileSync(bootstrapFile, `import(/* webpackChunkName: "async-${entryName}" */ './${INDEX_FILE_NAME}');`, "utf8");
        const bootstrapServerFile = path.resolve(internalDirectory, `./${entryName}/${ENTRY_SERVER_BOOTSTRAP_FILE_NAME}`);
        if (ssrMode) {
          fs.outputFileSync(bootstrapServerFile, `export const requestHandler = import('./${SERVER_ENTRY_POINT_FILE_NAME}').then((m) => m.requestHandler)`, "utf8");
        }
      }
      if (ssrMode) {
        const indexServerCode = serverTemplate.serverIndex({
          entry,
          entryName,
          internalSrcAlias,
          metaName,
          mode: ssrMode,
          customServerEntry,
          srcDirectory
        });
        const indexServerFile = path.resolve(internalDirectory, `./${entryName}/${SERVER_ENTRY_POINT_FILE_NAME}`);
        fs.outputFileSync(indexServerFile, indexServerCode, "utf8");
      }
      const registerCode = template.register();
      const registerFile = path.resolve(internalDirectory, `./${entryName}/${ENTRY_POINT_REGISTER_FILE_NAME}`);
      fs.outputFileSync(registerFile, registerCode, "utf8");
      const registerRuntimeCode = template.runtimeRegister({
        entryName,
        srcDirectory,
        internalSrcAlias,
        metaName,
        runtimeConfigFile,
        runtimePlugins
      });
      const registerRuntimeFile = path.resolve(internalDirectory, `./${entryName}/${ENTRY_POINT_RUNTIME_REGISTER_FILE_NAME}`);
      fs.outputFileSync(registerRuntimeFile, registerRuntimeCode, "utf8");
      const contextCode = template.runtimeGlobalContext({
        srcDirectory,
        internalSrcAlias,
        metaName,
        entry,
        customEntry
      });
      const contextFile = path.resolve(internalDirectory, `./${entryName}/${ENTRY_POINT_RUNTIME_GLOBAL_CONTEXT_FILE_NAME}`);
      fs.outputFileSync(contextFile, contextCode, "utf8");
    }
  }));
};
export {
  generateCode
};
