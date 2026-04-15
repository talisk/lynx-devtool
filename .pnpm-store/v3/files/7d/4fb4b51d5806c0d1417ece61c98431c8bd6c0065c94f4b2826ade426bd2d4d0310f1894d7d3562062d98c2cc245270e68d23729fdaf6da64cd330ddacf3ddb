import path from "path";
import { fs, getServerConfig } from "@modern-js/utils";
const getPackageConfig = (appDirectory, packageJsonConfig) => {
  const PACKAGE_JSON_CONFIG_NAME = "modernConfig";
  const json = JSON.parse(fs.readFileSync(path.resolve(appDirectory, "./package.json"), "utf8"));
  return json[packageJsonConfig !== null && packageJsonConfig !== void 0 ? packageJsonConfig : PACKAGE_JSON_CONFIG_NAME];
};
const addServerConfigToDeps = async (dependencies, appDirectory, serverConfigFile) => {
  const serverConfig = await getServerConfig(appDirectory, serverConfigFile);
  if (serverConfig) {
    dependencies.push(serverConfig);
  }
};
async function generateWatchFiles(appContext, configDir) {
  const { appDirectory, configFile } = appContext;
  const configPath = path.join(appDirectory, configDir || "");
  const dependencies = getPackageConfig(appContext.appDirectory, appContext.packageName) ? [
    path.resolve(appDirectory, "./package.json")
  ] : [];
  await addServerConfigToDeps(dependencies, appContext.appDirectory, appContext.serverConfigFile);
  return [
    `${configPath}/html`,
    configFile || "./config",
    ...dependencies
  ];
}
export {
  addServerConfigToDeps,
  generateWatchFiles
};
