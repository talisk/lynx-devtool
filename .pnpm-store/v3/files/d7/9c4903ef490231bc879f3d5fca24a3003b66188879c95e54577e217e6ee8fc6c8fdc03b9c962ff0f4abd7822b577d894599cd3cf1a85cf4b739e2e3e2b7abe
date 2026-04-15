"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var beforeTemplate_exports = {};
__export(beforeTemplate_exports, {
  buildShellBeforeTemplate: () => buildShellBeforeTemplate
});
module.exports = __toCommonJS(beforeTemplate_exports);
var import_router = require("@modern-js/runtime-utils/router");
var import_react_helmet = __toESM(require("react-helmet"));
var import_constants = require("../constants");
var import_helmet = require("../helmet");
var import_shared = require("../shared");
var import_utils = require("../utils");
const readAsset = async (chunk) => {
  const fs = await Promise.resolve().then(() => __toESM(require("fs/promises")));
  const path = await Promise.resolve().then(() => __toESM(require("path")));
  const filepath = path.join(__dirname, chunk);
  return fs.readFile(filepath, "utf-8");
};
const checkIsInline = (chunk, enableInline) => {
  if (process.env.NODE_ENV === "production") {
    if (enableInline instanceof RegExp) {
      return enableInline.test(chunk);
    } else {
      return Boolean(enableInline);
    }
  } else {
    return false;
  }
};
async function buildShellBeforeTemplate(beforeAppTemplate, options) {
  const { config, runtimeContext, styledComponentsStyleTags, entryName } = options;
  const helmetData = import_react_helmet.default.renderStatic();
  const callbacks = [
    (0, import_helmet.createReplaceHelemt)(helmetData),
    // @TODO: prefetch scripts of lazy component
    (template) => injectCss(template, entryName, styledComponentsStyleTags)
  ];
  return (0, import_shared.buildHtml)(beforeAppTemplate, callbacks);
  async function injectCss(template, entryName2, styledComponentsStyleTags2) {
    let css = await getCssChunks();
    if (styledComponentsStyleTags2) {
      css += styledComponentsStyleTags2;
    }
    return (0, import_utils.safeReplace)(template, import_constants.CHUNK_CSS_PLACEHOLDER, css);
    async function getCssChunks() {
      const { routeManifest, routerContext, routes } = runtimeContext;
      if (!routeManifest || !routerContext || !routes) {
        return "";
      }
      const { routeAssets } = routeManifest;
      const matches = (0, import_router.matchRoutes)(routes, routerContext.location, routerContext.basename);
      const matchedRouteManifests = matches === null || matches === void 0 ? void 0 : matches.map((match, index) => {
        if (!index) {
          return;
        }
        const routeId = match.route.id;
        if (routeId) {
          const routeManifest2 = routeAssets[routeId];
          return routeManifest2;
        }
      }).filter(Boolean);
      const asyncEntry = routeAssets[`async-${entryName2}`];
      if (asyncEntry) {
        matchedRouteManifests === null || matchedRouteManifests === void 0 ? void 0 : matchedRouteManifests.push(asyncEntry);
      }
      const cssChunks = matchedRouteManifests ? matchedRouteManifests === null || matchedRouteManifests === void 0 ? void 0 : matchedRouteManifests.reduce((chunks, routeManifest2) => {
        const { referenceCssAssets = [] } = routeManifest2;
        const _cssChunks = referenceCssAssets.filter((asset) => (asset === null || asset === void 0 ? void 0 : asset.endsWith(".css")) && !template.includes(asset));
        return [
          ...chunks,
          ..._cssChunks
        ];
      }, []) : [];
      const { enableInlineStyles } = config;
      const styles = await Promise.all(cssChunks.map(async (chunk) => {
        const link = `<link href="${chunk}" rel="stylesheet" />`;
        if ((0, import_utils.checkIsNode)() && checkIsInline(chunk, enableInlineStyles)) {
          return readAsset(chunk).then((content) => `<style>${content}</style>`).catch((_) => {
            return link;
          });
        } else {
          return link;
        }
      }));
      return `${styles.join("")}`;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildShellBeforeTemplate
});
