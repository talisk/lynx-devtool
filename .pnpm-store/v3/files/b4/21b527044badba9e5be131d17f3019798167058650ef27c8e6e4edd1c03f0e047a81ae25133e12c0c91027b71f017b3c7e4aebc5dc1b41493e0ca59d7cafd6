import path, { isAbsolute } from "path";
import { findExists } from "@modern-js/utils";
function initHtmlConfig(config, appContext) {
  var ICON_EXTENSIONS = [
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
    var appIcon = config2.html.appIcon;
    var configDir = config2.source.configDir;
    var getDefaultAppIcon = function() {
      return findExists(ICON_EXTENSIONS.map(function(ext) {
        return path.resolve(appContext2.appDirectory, configDir || "./config", "icon.".concat(ext));
      }));
    };
    return appIcon || getDefaultAppIcon() || void 0;
  }
  function createBuilderFavicon(config2, appContext2) {
    var configDir = config2.source.configDir;
    var favicon = config2.html.favicon;
    var getDefaultFavicon = function() {
      return findExists(ICON_EXTENSIONS.map(function(ext) {
        return path.resolve(appContext2.appDirectory, configDir || "./config", "favicon.".concat(ext));
      }));
    };
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
  var include = config.source.include;
  var defaultInclude = [
    appContext.internalDirectory
  ];
  var transformInclude = (include || []).map(function(include2) {
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
  var moduleScopes = config.source.moduleScopes;
  if (moduleScopes) {
    var DEFAULT_SCOPES = [
      "./src",
      "./shared",
      /node_modules/
    ];
    var builderModuleScope = applyScopeOptions(DEFAULT_SCOPES, moduleScopes);
    return builderModuleScope;
  } else {
    return void 0;
  }
  function isPrimitiveScope(items) {
    return items.every(function(item) {
      return typeof item === "string" || Object.prototype.toString.call(item) === "[object RegExp]";
    });
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
