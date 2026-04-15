import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { matchRoutes } from "@modern-js/runtime-utils/router";
import ReactHelmet from "react-helmet";
import { CHUNK_CSS_PLACEHOLDER } from "../constants";
import { createReplaceHelemt } from "../helmet";
import { buildHtml } from "../shared";
import { checkIsNode, safeReplace } from "../utils";
var readAsset = function() {
  var _ref = _async_to_generator(function(chunk) {
    var fs, path, filepath;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            import("fs/promises")
          ];
        case 1:
          fs = _state.sent();
          return [
            4,
            import("path")
          ];
        case 2:
          path = _state.sent();
          filepath = path.join(__dirname, chunk);
          return [
            2,
            fs.readFile(filepath, "utf-8")
          ];
      }
    });
  });
  return function readAsset2(chunk) {
    return _ref.apply(this, arguments);
  };
}();
var checkIsInline = function(chunk, enableInline) {
  if (process.env.NODE_ENV === "production") {
    if (_instanceof(enableInline, RegExp)) {
      return enableInline.test(chunk);
    } else {
      return Boolean(enableInline);
    }
  } else {
    return false;
  }
};
function buildShellBeforeTemplate(beforeAppTemplate, options) {
  return _buildShellBeforeTemplate.apply(this, arguments);
}
function _buildShellBeforeTemplate() {
  _buildShellBeforeTemplate = _async_to_generator(function(beforeAppTemplate, options) {
    var config, runtimeContext, styledComponentsStyleTags, entryName, helmetData, callbacks;
    function injectCss(template, entryName2, styledComponentsStyleTags2) {
      return _injectCss.apply(this, arguments);
    }
    function _injectCss() {
      _injectCss = _async_to_generator(function(template, entryName2, styledComponentsStyleTags2) {
        var css;
        function getCssChunks() {
          return _getCssChunks.apply(this, arguments);
        }
        function _getCssChunks() {
          _getCssChunks = _async_to_generator(function() {
            var routeManifest, routerContext, routes, routeAssets, matches, matchedRouteManifests, asyncEntry, cssChunks, enableInlineStyles, styles;
            return _ts_generator(this, function(_state) {
              switch (_state.label) {
                case 0:
                  routeManifest = runtimeContext.routeManifest, routerContext = runtimeContext.routerContext, routes = runtimeContext.routes;
                  if (!routeManifest || !routerContext || !routes) {
                    return [
                      2,
                      ""
                    ];
                  }
                  routeAssets = routeManifest.routeAssets;
                  matches = matchRoutes(routes, routerContext.location, routerContext.basename);
                  matchedRouteManifests = matches === null || matches === void 0 ? void 0 : matches.map(function(match, index) {
                    if (!index) {
                      return;
                    }
                    var routeId = match.route.id;
                    if (routeId) {
                      var routeManifest2 = routeAssets[routeId];
                      return routeManifest2;
                    }
                  }).filter(Boolean);
                  asyncEntry = routeAssets["async-".concat(entryName2)];
                  if (asyncEntry) {
                    matchedRouteManifests === null || matchedRouteManifests === void 0 ? void 0 : matchedRouteManifests.push(asyncEntry);
                  }
                  cssChunks = matchedRouteManifests ? matchedRouteManifests === null || matchedRouteManifests === void 0 ? void 0 : matchedRouteManifests.reduce(function(chunks, routeManifest2) {
                    var _routeManifest_referenceCssAssets = routeManifest2.referenceCssAssets, referenceCssAssets = _routeManifest_referenceCssAssets === void 0 ? [] : _routeManifest_referenceCssAssets;
                    var _cssChunks = referenceCssAssets.filter(function(asset) {
                      return (asset === null || asset === void 0 ? void 0 : asset.endsWith(".css")) && !template.includes(asset);
                    });
                    return _to_consumable_array(chunks).concat(_to_consumable_array(_cssChunks));
                  }, []) : [];
                  enableInlineStyles = config.enableInlineStyles;
                  return [
                    4,
                    Promise.all(cssChunks.map(function() {
                      var _ref = _async_to_generator(function(chunk) {
                        var link;
                        return _ts_generator(this, function(_state2) {
                          link = '<link href="'.concat(chunk, '" rel="stylesheet" />');
                          if (checkIsNode() && checkIsInline(chunk, enableInlineStyles)) {
                            return [
                              2,
                              readAsset(chunk).then(function(content) {
                                return "<style>".concat(content, "</style>");
                              }).catch(function(_) {
                                return link;
                              })
                            ];
                          } else {
                            return [
                              2,
                              link
                            ];
                          }
                          return [
                            2
                          ];
                        });
                      });
                      return function(chunk) {
                        return _ref.apply(this, arguments);
                      };
                    }()))
                  ];
                case 1:
                  styles = _state.sent();
                  return [
                    2,
                    "".concat(styles.join(""))
                  ];
              }
            });
          });
          return _getCssChunks.apply(this, arguments);
        }
        return _ts_generator(this, function(_state) {
          switch (_state.label) {
            case 0:
              return [
                4,
                getCssChunks()
              ];
            case 1:
              css = _state.sent();
              if (styledComponentsStyleTags2) {
                css += styledComponentsStyleTags2;
              }
              return [
                2,
                safeReplace(template, CHUNK_CSS_PLACEHOLDER, css)
              ];
          }
        });
      });
      return _injectCss.apply(this, arguments);
    }
    return _ts_generator(this, function(_state) {
      config = options.config, runtimeContext = options.runtimeContext, styledComponentsStyleTags = options.styledComponentsStyleTags, entryName = options.entryName;
      helmetData = ReactHelmet.renderStatic();
      callbacks = [
        createReplaceHelemt(helmetData),
        // @TODO: prefetch scripts of lazy component
        function(template) {
          return injectCss(template, entryName, styledComponentsStyleTags);
        }
      ];
      return [
        2,
        buildHtml(beforeAppTemplate, callbacks)
      ];
    });
  });
  return _buildShellBeforeTemplate.apply(this, arguments);
}
export {
  buildShellBeforeTemplate
};
