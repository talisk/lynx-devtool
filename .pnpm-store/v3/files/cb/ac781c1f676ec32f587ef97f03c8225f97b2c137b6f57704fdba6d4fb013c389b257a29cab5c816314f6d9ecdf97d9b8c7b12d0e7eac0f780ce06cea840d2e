import path from "path";
import { SERVICE_WORKER_ENVIRONMENT_NAME } from "@modern-js/uni-builder";
const builderPluginAdapterBasic = () => ({
  name: "builder-plugin-adapter-modern-basic",
  setup(api) {
    api.modifyBundlerChain((chain, { target, CHAIN_ID, environment }) => {
      const isServiceWorker = environment.name === SERVICE_WORKER_ENVIRONMENT_NAME;
      if (target === "node" || isServiceWorker) {
        applyNodeCompat(isServiceWorker, chain);
      }
      if (target === "web") {
        const bareServerModuleReg = /\.(server|node)\.[tj]sx?$/;
        chain.module.rule(CHAIN_ID.RULE.JS).exclude.add(bareServerModuleReg);
        chain.module.rule("bare-server-module").test(bareServerModuleReg).use("server-module-loader").loader(require.resolve("../loaders/serverModuleLoader"));
      }
      chain.resolve.modules.add("node_modules").add(path.join(api.context.rootPath, "node_modules"));
    });
  }
});
function applyNodeCompat(isServiceWorker, chain) {
  const nodeExts = [
    ".node.js",
    ".node.jsx",
    ".node.ts",
    ".node.tsx",
    ".server.js",
    ".server.jsx",
    ".server.ts",
    ".server.tsx"
  ];
  const webWorkerExts = [
    ".worker.js",
    ".worker.jsx",
    ".worker.ts",
    ".worker.tsx"
  ];
  for (const ext of nodeExts) {
    chain.resolve.extensions.prepend(ext);
  }
  if (isServiceWorker) {
    for (const ext of webWorkerExts) {
      chain.resolve.extensions.prepend(ext);
    }
  }
}
export {
  builderPluginAdapterBasic
};
