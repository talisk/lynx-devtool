import path from "path";
function createCopyInfo(appContext, config) {
  var configDir = path.resolve(appContext.appDirectory, config.source.configDir || "./config");
  var uploadDir = path.posix.join(configDir.replace(/\\/g, "/"), "upload");
  var publicDir = path.posix.join(configDir.replace(/\\/g, "/"), "public");
  return {
    configDir,
    uploadDir,
    publicDir
  };
}
export {
  createCopyInfo
};
