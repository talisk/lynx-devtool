import { compatibleRequire, tryResolve } from "@modern-js/utils";
async function resolveServerPlugin(plugin, appDirectory) {
  const { name, options } = plugin;
  const pluginPath = tryResolve(name, appDirectory);
  const module = await compatibleRequire(pluginPath);
  const pluginInstance = module(options);
  return pluginInstance;
}
async function loadServerPlugins(serverPlugins, appDirectory) {
  const instances = await Promise.all(serverPlugins.map((plugin) => resolveServerPlugin(plugin, appDirectory)));
  return instances;
}
export {
  loadServerPlugins
};
