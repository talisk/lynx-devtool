import path from "path";
import { cloneDeep } from "@modern-js/utils/lodash";
import * as templates from "./code/templates";
import { isPageComponentFile } from "./code/utils";
import { modifyEntrypoints } from "./entry";
let originEntrypoints = [];
async function handleModifyEntrypoints(api, entrypoints) {
  const config = api.useResolvedConfigContext();
  return modifyEntrypoints(entrypoints, config);
}
async function handleGeneratorEntryCode(api, entrypoints) {
  const appContext = api.useAppContext();
  const { internalDirectory } = api.useAppContext();
  const resolvedConfig = api.useResolvedConfigContext();
  const { generatorRegisterCode, generateCode } = await import("./code");
  originEntrypoints = cloneDeep(entrypoints);
  await generateCode(appContext, resolvedConfig, entrypoints, api);
  await Promise.all(entrypoints.map(async (entrypoint) => {
    if (entrypoint.nestedRoutesEntry || entrypoint.pageRoutesEntry) {
      var _entrypoint_fileSystemRoutes;
      generatorRegisterCode(internalDirectory, entrypoint.entryName, await templates.runtimeGlobalContext({
        metaName: appContext.metaName,
        srcDirectory: appContext.srcDirectory,
        nestedRoutesEntry: entrypoint.nestedRoutesEntry,
        internalSrcAlias: appContext.internalSrcAlias,
        globalApp: (_entrypoint_fileSystemRoutes = entrypoint.fileSystemRoutes) === null || _entrypoint_fileSystemRoutes === void 0 ? void 0 : _entrypoint_fileSystemRoutes.globalApp
      }));
    }
  }));
  return entrypoints;
}
async function handleFileChange(api, e) {
  const appContext = api.useAppContext();
  const { appDirectory, entrypoints } = appContext;
  const { filename, eventType } = e;
  const nestedRouteEntries = entrypoints.map((point) => point.nestedRoutesEntry).filter(Boolean);
  const pagesDir = entrypoints.map((point) => point.entry).filter((entry) => entry && !path.extname(entry)).concat(nestedRouteEntries);
  const isPageFile = (name) => pagesDir.some((pageDir) => name.includes(pageDir));
  const absoluteFilePath = path.resolve(appDirectory, filename);
  const isRouteComponent = isPageFile(absoluteFilePath) && isPageComponentFile(absoluteFilePath);
  if (isRouteComponent && (eventType === "add" || eventType === "unlink")) {
    const resolvedConfig = api.useResolvedConfigContext();
    const { generateCode } = await import("./code");
    const entrypoints2 = cloneDeep(originEntrypoints);
    await generateCode(appContext, resolvedConfig, entrypoints2, api);
  }
}
export {
  handleFileChange,
  handleGeneratorEntryCode,
  handleModifyEntrypoints
};
