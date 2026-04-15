"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var adapterHtml_exports = {};
__export(adapterHtml_exports, {
  builderPluginAdapterHtml: () => builderPluginAdapterHtml
});
module.exports = __toCommonJS(adapterHtml_exports);
var import_uni_builder = require("@modern-js/uni-builder");
var import_utils = require("@modern-js/utils");
var import_lodash = require("@modern-js/utils/lodash");
var import_bundlerPlugins = require("../bundlerPlugins");
const createVirtualModule = (content) => `data:text/javascript,${content}`;
const builderPluginAdapterHtml = (options) => ({
  name: "builder-plugin-adapter-modern-html",
  setup(api) {
    api.modifyBundlerChain(async (chain, { CHAIN_ID, target, HtmlPlugin: HtmlBundlerPlugin, environment }) => {
      const builderConfig = environment.config;
      if (!(0, import_uni_builder.isHtmlDisabled)(builderConfig, target)) {
        applyBottomHtmlPlugin({
          options,
          chain,
          CHAIN_ID,
          HtmlBundlerPlugin,
          htmlPaths: environment.htmlPaths
        });
        await injectAssetPrefix({
          chain
        });
      }
    });
  }
});
async function injectAssetPrefix({ chain }) {
  const entries = chain.entryPoints.entries() || {};
  const entryNames = Object.keys(entries);
  const assetPrefix = (0, import_utils.removeTailSlash)(chain.output.get("publicPath") || "");
  const code = `window.__assetPrefix__ = '${assetPrefix}';`;
  entryNames.forEach((entryName) => {
    entries[entryName].prepend(createVirtualModule(code));
  });
}
function applyBottomHtmlPlugin({ chain, options, CHAIN_ID, HtmlBundlerPlugin, htmlPaths }) {
  const { normalizedConfig: modernConfig, appContext } = options;
  for (const entryName of Object.keys(htmlPaths)) {
    const { source: { mainEntryName } } = modernConfig;
    const isMainEntry = entryName === (mainEntryName || import_utils.MAIN_ENTRY_NAME);
    const baseTemplateParams = {
      entryName,
      title: (0, import_utils.getEntryOptions)(entryName, isMainEntry, modernConfig.html.title, modernConfig.html.titleByEntries, appContext.packageName),
      mountId: modernConfig.html.mountId,
      ...(0, import_utils.getEntryOptions)(entryName, isMainEntry, modernConfig.html.templateParameters, modernConfig.html.templateParametersByEntries, appContext.packageName)
    };
    chain.plugin(`${CHAIN_ID.PLUGIN.HTML}-${entryName}`).tap((args) => [
      {
        ...args[0] || {},
        __internal__: true,
        bottomTemplate: appContext.htmlTemplates[`__${entryName}-bottom__`] && (0, import_lodash.template)(appContext.htmlTemplates[`__${entryName}-bottom__`])(baseTemplateParams)
      }
    ]);
  }
  chain.plugin("bottom-template").use(import_bundlerPlugins.BottomTemplatePlugin, [
    HtmlBundlerPlugin
  ]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  builderPluginAdapterHtml
});
