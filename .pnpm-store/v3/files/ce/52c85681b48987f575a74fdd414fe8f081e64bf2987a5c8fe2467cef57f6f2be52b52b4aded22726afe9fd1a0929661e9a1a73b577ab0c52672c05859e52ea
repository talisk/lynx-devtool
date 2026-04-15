import { isHtmlDisabled } from "@modern-js/uni-builder";
import { MAIN_ENTRY_NAME, getEntryOptions, removeTailSlash } from "@modern-js/utils";
import { template as lodashTemplate } from "@modern-js/utils/lodash";
import { BottomTemplatePlugin } from "../bundlerPlugins";
const createVirtualModule = (content) => `data:text/javascript,${content}`;
const builderPluginAdapterHtml = (options) => ({
  name: "builder-plugin-adapter-modern-html",
  setup(api) {
    api.modifyBundlerChain(async (chain, { CHAIN_ID, target, HtmlPlugin: HtmlBundlerPlugin, environment }) => {
      const builderConfig = environment.config;
      if (!isHtmlDisabled(builderConfig, target)) {
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
  const assetPrefix = removeTailSlash(chain.output.get("publicPath") || "");
  const code = `window.__assetPrefix__ = '${assetPrefix}';`;
  entryNames.forEach((entryName) => {
    entries[entryName].prepend(createVirtualModule(code));
  });
}
function applyBottomHtmlPlugin({ chain, options, CHAIN_ID, HtmlBundlerPlugin, htmlPaths }) {
  const { normalizedConfig: modernConfig, appContext } = options;
  for (const entryName of Object.keys(htmlPaths)) {
    const { source: { mainEntryName } } = modernConfig;
    const isMainEntry = entryName === (mainEntryName || MAIN_ENTRY_NAME);
    const baseTemplateParams = {
      entryName,
      title: getEntryOptions(entryName, isMainEntry, modernConfig.html.title, modernConfig.html.titleByEntries, appContext.packageName),
      mountId: modernConfig.html.mountId,
      ...getEntryOptions(entryName, isMainEntry, modernConfig.html.templateParameters, modernConfig.html.templateParametersByEntries, appContext.packageName)
    };
    chain.plugin(`${CHAIN_ID.PLUGIN.HTML}-${entryName}`).tap((args) => [
      {
        ...args[0] || {},
        __internal__: true,
        bottomTemplate: appContext.htmlTemplates[`__${entryName}-bottom__`] && lodashTemplate(appContext.htmlTemplates[`__${entryName}-bottom__`])(baseTemplateParams)
      }
    ]);
  }
  chain.plugin("bottom-template").use(BottomTemplatePlugin, [
    HtmlBundlerPlugin
  ]);
}
export {
  builderPluginAdapterHtml
};
