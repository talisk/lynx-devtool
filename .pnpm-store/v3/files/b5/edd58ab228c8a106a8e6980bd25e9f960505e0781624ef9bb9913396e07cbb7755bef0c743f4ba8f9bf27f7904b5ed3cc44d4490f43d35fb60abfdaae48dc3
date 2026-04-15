import { matchRoutes } from "@modern-js/runtime-utils/router";
import ReactHelmet from "react-helmet";
import { CHUNK_CSS_PLACEHOLDER } from "../constants";
import { createReplaceHelemt } from "../helmet";
import { buildHtml } from "../shared";
import { checkIsNode, safeReplace } from "../utils";
const readAsset = async (chunk) => {
  const fs = await import("fs/promises");
  const path = await import("path");
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
  const helmetData = ReactHelmet.renderStatic();
  const callbacks = [
    createReplaceHelemt(helmetData),
    // @TODO: prefetch scripts of lazy component
    (template) => injectCss(template, entryName, styledComponentsStyleTags)
  ];
  return buildHtml(beforeAppTemplate, callbacks);
  async function injectCss(template, entryName2, styledComponentsStyleTags2) {
    let css = await getCssChunks();
    if (styledComponentsStyleTags2) {
      css += styledComponentsStyleTags2;
    }
    return safeReplace(template, CHUNK_CSS_PLACEHOLDER, css);
    async function getCssChunks() {
      const { routeManifest, routerContext, routes } = runtimeContext;
      if (!routeManifest || !routerContext || !routes) {
        return "";
      }
      const { routeAssets } = routeManifest;
      const matches = matchRoutes(routes, routerContext.location, routerContext.basename);
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
        if (checkIsNode() && checkIsInline(chunk, enableInlineStyles)) {
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
export {
  buildShellBeforeTemplate
};
