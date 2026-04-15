import * as path from "path";
import { SERVICE_WORKER_ENVIRONMENT_NAME, isHtmlDisabled } from "@modern-js/uni-builder";
import { fs, isUseSSRBundle } from "@modern-js/utils";
import { mergeRsbuildConfig } from "@rsbuild/core";
import { getServerCombinedModueFile } from "../../../plugins/analyze/utils";
import { HtmlAsyncChunkPlugin, RouterPlugin } from "../bundlerPlugins";
const builderPluginAdapterSSR = (options) => ({
  name: "builder-plugin-adapter-modern-ssr",
  setup(api) {
    const { normalizedConfig } = options;
    api.modifyRsbuildConfig((config) => {
      return mergeRsbuildConfig(config, {
        html: {
          inject: isStreamingSSR(normalizedConfig) ? "body" : void 0
        },
        server: {
          // the http-compression can't handler stream http.
          // so we disable compress when user use stream ssr temporarily.
          compress: isStreamingSSR(normalizedConfig) ? false : void 0
        }
      });
    });
    api.modifyBundlerChain(async (chain, { target, isProd, HtmlPlugin: HtmlBundlerPlugin, isServer, environment }) => {
      const builderConfig = environment.config;
      const { normalizedConfig: normalizedConfig2 } = options;
      applyRouterPlugin(chain, "route-plugin", options, HtmlBundlerPlugin);
      const isServiceWorker = environment.name === SERVICE_WORKER_ENVIRONMENT_NAME;
      if (target === "node" || isServiceWorker) {
        applyFilterEntriesBySSRConfig({
          isProd,
          chain,
          appNormalizedConfig: normalizedConfig2
        });
      }
      if (isUseSSRBundle(normalizedConfig2)) {
        await applySSRLoaderEntry(chain, options, isServer);
        applySSRDataLoader(chain, options);
      }
      if (!isHtmlDisabled(builderConfig, target)) {
        applyAsyncChunkHtmlPlugin({
          chain,
          modernConfig: options.normalizedConfig,
          HtmlBundlerPlugin
        });
      }
    });
  }
});
const isStreamingSSR = (userConfig) => {
  const isStreaming = (ssr) => ssr && typeof ssr === "object" && ssr.mode === "stream";
  const { server } = userConfig;
  if (isStreaming(server.ssr)) {
    return true;
  }
  if ((server === null || server === void 0 ? void 0 : server.ssrByEntries) && typeof server.ssrByEntries === "object") {
    for (const name of Object.keys(server.ssrByEntries)) {
      if (isStreaming(server.ssrByEntries[name])) {
        return true;
      }
    }
  }
  return false;
};
function applyAsyncChunkHtmlPlugin({ chain, modernConfig, HtmlBundlerPlugin }) {
  if (isStreamingSSR(modernConfig)) {
    chain.plugin("html-async-chunk").use(HtmlAsyncChunkPlugin, [
      HtmlBundlerPlugin
    ]);
  }
}
function applyRouterPlugin(chain, pluginName, options, HtmlBundlerPlugin) {
  var _normalizedConfig_runtime, _normalizedConfig_deploy_worker;
  const { appContext, normalizedConfig } = options;
  const { entrypoints } = appContext;
  const existNestedRoutes = entrypoints.some((entrypoint) => entrypoint.nestedRoutesEntry);
  const routerConfig = normalizedConfig === null || normalizedConfig === void 0 ? void 0 : (_normalizedConfig_runtime = normalizedConfig.runtime) === null || _normalizedConfig_runtime === void 0 ? void 0 : _normalizedConfig_runtime.router;
  const routerManifest = Boolean(routerConfig === null || routerConfig === void 0 ? void 0 : routerConfig.manifest);
  const workerSSR = Boolean((_normalizedConfig_deploy_worker = normalizedConfig.deploy.worker) === null || _normalizedConfig_deploy_worker === void 0 ? void 0 : _normalizedConfig_deploy_worker.ssr);
  const { enableInlineRouteManifests, disableInlineRouteManifests } = normalizedConfig.output;
  const inlineRouteManifests = disableInlineRouteManifests ? !disableInlineRouteManifests : enableInlineRouteManifests;
  if (existNestedRoutes || routerManifest || workerSSR) {
    var _normalizedConfig_output_distPath, _normalizedConfig_output, _normalizedConfig_output1, _normalizedConfig_html, _normalizedConfig_security;
    chain.plugin(pluginName).use(RouterPlugin, [
      {
        HtmlBundlerPlugin,
        enableInlineRouteManifests: inlineRouteManifests,
        staticJsDir: (_normalizedConfig_output = normalizedConfig.output) === null || _normalizedConfig_output === void 0 ? void 0 : (_normalizedConfig_output_distPath = _normalizedConfig_output.distPath) === null || _normalizedConfig_output_distPath === void 0 ? void 0 : _normalizedConfig_output_distPath.js,
        disableFilenameHash: (_normalizedConfig_output1 = normalizedConfig.output) === null || _normalizedConfig_output1 === void 0 ? void 0 : _normalizedConfig_output1.disableFilenameHash,
        scriptLoading: (_normalizedConfig_html = normalizedConfig.html) === null || _normalizedConfig_html === void 0 ? void 0 : _normalizedConfig_html.scriptLoading,
        nonce: (_normalizedConfig_security = normalizedConfig.security) === null || _normalizedConfig_security === void 0 ? void 0 : _normalizedConfig_security.nonce
      }
    ]);
  }
}
function applyFilterEntriesBySSRConfig({ isProd, chain, appNormalizedConfig }) {
  var _outputConfig_ssg;
  const { server: serverConfig, output: outputConfig } = appNormalizedConfig;
  const entries = chain.entryPoints.entries();
  if (isProd && ((outputConfig === null || outputConfig === void 0 ? void 0 : outputConfig.ssg) === true || typeof (outputConfig === null || outputConfig === void 0 ? void 0 : (_outputConfig_ssg = outputConfig.ssg) === null || _outputConfig_ssg === void 0 ? void 0 : _outputConfig_ssg[0]) === "function")) {
    return;
  }
  if (typeof entries === "undefined") {
    throw new Error("No entry found, one of src/routes/layout.tsx, src/App.tsx, src/index.tsx is required");
  }
  const entryNames = Object.keys(entries);
  if (isProd && entryNames.length === 1 && (outputConfig === null || outputConfig === void 0 ? void 0 : outputConfig.ssg)) {
    return;
  }
  const ssgEntries = [];
  if (isProd && (outputConfig === null || outputConfig === void 0 ? void 0 : outputConfig.ssg)) {
    const { ssg } = outputConfig;
    entryNames.forEach((name) => {
      if (ssg[name]) {
        ssgEntries.push(name);
      }
    });
  }
  const { ssr, ssrByEntries } = serverConfig || {};
  entryNames.forEach((name) => {
    if (!ssgEntries.includes(name) && !name.includes("server-loaders") && (ssr && (ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[name]) === false || !ssr && !(ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[name]))) {
      chain.entryPoints.delete(name);
    }
  });
}
async function applySSRLoaderEntry(chain, optinos, isServer) {
  const { appContext } = optinos;
  const { internalDirectory } = appContext;
  const { entrypoints } = appContext;
  await Promise.all(entrypoints.map(async (entrypoint) => {
    const { entryName } = entrypoint;
    const serverLoadersFile = getServerCombinedModueFile(internalDirectory, entryName);
    if (isServer) {
      try {
        await fs.access(serverLoadersFile, fs.constants.F_OK);
        chain.entry(`${entryName}-server-loaders`).add(serverLoadersFile);
      } catch (err) {
      }
    }
  }));
}
function applySSRDataLoader(chain, options) {
  const { normalizedConfig, appContext } = options;
  const { appDirectory } = appContext;
  const { entriesDir = "./src" } = normalizedConfig.source;
  const absolutePath = path.resolve(appDirectory, entriesDir).split(path.sep).join("(\\\\|/)");
  const reg = new RegExp(`${absolutePath}.*\\.(loader|data|data.client)\\.[t|j]sx?$`);
  chain.module.rule("ssr-data-loader").test(reg).use("data-loader").loader(require.resolve("@modern-js/plugin-data-loader/loader")).end();
}
export {
  builderPluginAdapterSSR
};
