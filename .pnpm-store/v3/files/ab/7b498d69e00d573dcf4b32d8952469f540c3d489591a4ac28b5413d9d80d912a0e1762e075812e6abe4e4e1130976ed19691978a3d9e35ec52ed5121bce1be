import path, { isAbsolute } from "path";
import { findExists } from "@modern-js/utils";
function initHtmlConfig(config, appContext) {
  const ICON_EXTENSIONS = [
    "png",
    "jpg",
    "jpeg",
    "svg",
    "ico"
  ];
  config.html.appIcon = createBuilderAppIcon(config, appContext);
  config.html.favicon = createBuilderFavicon(config, appContext);
  return config.html;
  function createBuilderAppIcon(config2, appContext2) {
    const { appIcon } = config2.html;
    const { configDir } = config2.source;
    const getDefaultAppIcon = () => findExists(ICON_EXTENSIONS.map((ext) => path.resolve(appContext2.appDirectory, configDir || "./config", `icon.${ext}`)));
    return appIcon || getDefaultAppIcon() || void 0;
  }
  function createBuilderFavicon(config2, appContext2) {
    const { configDir } = config2.source;
    const { favicon } = config2.html;
    const getDefaultFavicon = () => findExists(ICON_EXTENSIONS.map((ext) => path.resolve(appContext2.appDirectory, configDir || "./config", `favicon.${ext}`)));
    return favicon || getDefaultFavicon() || void 0;
  }
}
function initSourceConfig(config, appContext, bundler) {
  config.source.include = createBuilderInclude(config, appContext);
  if (bundler === "webpack") {
    config.source.moduleScopes = createBuilderModuleScope(config);
  }
}
function createBuilderInclude(config, appContext) {
  const { include } = config.source;
  const defaultInclude = [
    appContext.internalDirectory
  ];
  const transformInclude = (include || []).map((include2) => {
    if (typeof include2 === "string") {
      if (isAbsolute(include2)) {
        return include2;
      }
      return new RegExp(include2);
    }
    return include2;
  }).concat(defaultInclude);
  return transformInclude;
}
function createBuilderModuleScope(config) {
  const { moduleScopes } = config.source;
  if (moduleScopes) {
    const DEFAULT_SCOPES = [
      "./src",
      "./shared",
      /node_modules/
    ];
    const builderModuleScope = applyScopeOptions(DEFAULT_SCOPES, moduleScopes);
    return builderModuleScope;
  } else {
    return void 0;
  }
  function isPrimitiveScope(items) {
    return items.every((item) => typeof item === "string" || Object.prototype.toString.call(item) === "[object RegExp]");
  }
  function applyScopeOptions(defaults, options) {
    if (Array.isArray(options)) {
      if (isPrimitiveScope(options)) {
        return defaults.concat(options);
      }
      return options.reduce(applyScopeOptions, defaults);
    }
    return options(defaults) || defaults;
  }
}
export {
  createBuilderModuleScope,
  initHtmlConfig,
  initSourceConfig
};
