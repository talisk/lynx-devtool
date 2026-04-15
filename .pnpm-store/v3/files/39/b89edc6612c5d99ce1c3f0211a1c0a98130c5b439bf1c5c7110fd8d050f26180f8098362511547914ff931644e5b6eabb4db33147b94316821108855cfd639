import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { isHtmlDisabled } from "@modern-js/uni-builder";
import { MAIN_ENTRY_NAME, getEntryOptions, removeTailSlash } from "@modern-js/utils";
import { template as lodashTemplate } from "@modern-js/utils/lodash";
import { BottomTemplatePlugin } from "../bundlerPlugins";
var createVirtualModule = function(content) {
  return "data:text/javascript,".concat(content);
};
var builderPluginAdapterHtml = function(options) {
  return {
    name: "builder-plugin-adapter-modern-html",
    setup: function setup(api) {
      api.modifyBundlerChain(function() {
        var _ref = _async_to_generator(function(chain, param) {
          var CHAIN_ID, target, HtmlBundlerPlugin, environment, builderConfig;
          return _ts_generator(this, function(_state) {
            switch (_state.label) {
              case 0:
                CHAIN_ID = param.CHAIN_ID, target = param.target, HtmlBundlerPlugin = param.HtmlPlugin, environment = param.environment;
                builderConfig = environment.config;
                if (!!isHtmlDisabled(builderConfig, target))
                  return [
                    3,
                    2
                  ];
                applyBottomHtmlPlugin({
                  options,
                  chain,
                  CHAIN_ID,
                  HtmlBundlerPlugin,
                  htmlPaths: environment.htmlPaths
                });
                return [
                  4,
                  injectAssetPrefix({
                    chain
                  })
                ];
              case 1:
                _state.sent();
                _state.label = 2;
              case 2:
                return [
                  2
                ];
            }
          });
        });
        return function(chain, _) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  };
};
function injectAssetPrefix(_) {
  return _injectAssetPrefix.apply(this, arguments);
}
function _injectAssetPrefix() {
  _injectAssetPrefix = _async_to_generator(function(param) {
    var chain, entries, entryNames, assetPrefix, code;
    return _ts_generator(this, function(_state) {
      chain = param.chain;
      entries = chain.entryPoints.entries() || {};
      entryNames = Object.keys(entries);
      assetPrefix = removeTailSlash(chain.output.get("publicPath") || "");
      code = "window.__assetPrefix__ = '".concat(assetPrefix, "';");
      entryNames.forEach(function(entryName) {
        entries[entryName].prepend(createVirtualModule(code));
      });
      return [
        2
      ];
    });
  });
  return _injectAssetPrefix.apply(this, arguments);
}
function applyBottomHtmlPlugin(param) {
  var chain = param.chain, options = param.options, CHAIN_ID = param.CHAIN_ID, HtmlBundlerPlugin = param.HtmlBundlerPlugin, htmlPaths = param.htmlPaths;
  var modernConfig = options.normalizedConfig, appContext = options.appContext;
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    var _loop = function() {
      var entryName = _step.value;
      var mainEntryName = modernConfig.source.mainEntryName;
      var isMainEntry = entryName === (mainEntryName || MAIN_ENTRY_NAME);
      var baseTemplateParams = _object_spread({
        entryName,
        title: getEntryOptions(entryName, isMainEntry, modernConfig.html.title, modernConfig.html.titleByEntries, appContext.packageName),
        mountId: modernConfig.html.mountId
      }, getEntryOptions(entryName, isMainEntry, modernConfig.html.templateParameters, modernConfig.html.templateParametersByEntries, appContext.packageName));
      chain.plugin("".concat(CHAIN_ID.PLUGIN.HTML, "-").concat(entryName)).tap(function(args) {
        return [
          _object_spread_props(_object_spread({}, args[0] || {}), {
            __internal__: true,
            bottomTemplate: appContext.htmlTemplates["__".concat(entryName, "-bottom__")] && lodashTemplate(appContext.htmlTemplates["__".concat(entryName, "-bottom__")])(baseTemplateParams)
          })
        ];
      });
    };
    for (var _iterator = Object.keys(htmlPaths)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)
      _loop();
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  chain.plugin("bottom-template").use(BottomTemplatePlugin, [
    HtmlBundlerPlugin
  ]);
}
export {
  builderPluginAdapterHtml
};
