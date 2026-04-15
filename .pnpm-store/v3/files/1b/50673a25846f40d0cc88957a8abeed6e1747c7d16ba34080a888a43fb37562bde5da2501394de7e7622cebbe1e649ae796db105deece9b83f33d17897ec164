import { createServerBase } from "@modern-js/server-core";
import { loadServerCliConfig, loadServerEnv } from "@modern-js/server-core/node";
import { applyPlugins } from "./apply";
const createNetlifyFunction = async (options) => {
  const serverCliConfig = loadServerCliConfig(options.pwd, options.config);
  if (serverCliConfig) {
    options.config = serverCliConfig;
  }
  const server = createServerBase(options);
  await loadServerEnv(options);
  await applyPlugins(server, options);
  await server.init();
  return (request, context) => {
    return server.handle(request, context);
  };
};
export {
  createNetlifyFunction
};
