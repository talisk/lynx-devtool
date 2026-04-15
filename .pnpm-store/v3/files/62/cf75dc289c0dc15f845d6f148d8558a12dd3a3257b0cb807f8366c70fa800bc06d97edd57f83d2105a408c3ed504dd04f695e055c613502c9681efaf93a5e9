import path from "path";
function createCopyInfo(appContext, config) {
  const configDir = path.resolve(appContext.appDirectory, config.source.configDir || "./config");
  const uploadDir = path.posix.join(configDir.replace(/\\/g, "/"), "upload");
  const publicDir = path.posix.join(configDir.replace(/\\/g, "/"), "public");
  return {
    configDir,
    uploadDir,
    publicDir
  };
}
export {
  createCopyInfo
};
