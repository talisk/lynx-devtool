import { createServerBase } from "@modern-js/server-core";
import { createNodeServer, loadServerCliConfig, loadServerEnv, loadServerRuntimeConfig } from "@modern-js/server-core/node";
import sourceMapSupport from "source-map-support";
import { applyPlugins } from "./apply";
sourceMapSupport.install();
import { applyPlugins as applyPlugins2 } from "./apply";
import { loadServerPlugins, loadServerRuntimeConfig as loadServerRuntimeConfig2 } from "@modern-js/server-core/node";
const createProdServer = async (options) => {
  await loadServerEnv(options);
  const serverBaseOptions = options;
  const serverCliConfig = process.env.NODE_ENV === "production" ? loadServerCliConfig(options.pwd, options.config) : options.config;
  if (serverCliConfig) {
    serverBaseOptions.config = serverCliConfig;
  }
  const serverRuntimeConfig = await loadServerRuntimeConfig(options.pwd, options.serverConfigFile, options.serverConfigPath);
  if (serverRuntimeConfig) {
    serverBaseOptions.serverConfig = serverRuntimeConfig;
  }
  const server = createServerBase(serverBaseOptions);
  const nodeServer = await createNodeServer(server.handle.bind(server));
  await applyPlugins(server, options, nodeServer);
  await server.init();
  return nodeServer;
};
export {
  applyPlugins2 as applyPlugins,
  createProdServer,
  loadServerPlugins,
  loadServerRuntimeConfig2 as loadServerRuntimeConfig
};
