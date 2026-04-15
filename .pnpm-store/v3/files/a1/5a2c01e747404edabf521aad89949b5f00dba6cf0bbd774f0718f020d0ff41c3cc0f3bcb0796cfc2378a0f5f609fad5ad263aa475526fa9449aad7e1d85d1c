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
var createOutputConfig_exports = {};
__export(createOutputConfig_exports, {
  createOutputConfig: () => createOutputConfig
});
module.exports = __toCommonJS(createOutputConfig_exports);
function createOutputConfig(config) {
  const { assetPrefix, copy, cssModuleLocalIdentName, cssPath, jsPath, htmlPath, mediaPath, enableTsLoader, path, disableInlineRuntimeChunk, disableCssExtract, disableMinimize, disableSourceMap, disableTsChecker, enableCssModuleTSDeclaration, enableInlineScripts, enableInlineStyles, polyfill, dataUriLimit, disableAssetsCache, enableLatestDecorators, disableCssModuleExtension, ssg, disableNodePolyfill } = config.output;
  return {
    assetPrefix,
    copy,
    distPath: {
      root: path,
      css: cssPath,
      js: jsPath,
      html: htmlPath,
      // modern.js v1 output all media files to `dist/media` by default
      svg: mediaPath || "media",
      image: mediaPath || "media",
      font: mediaPath || "media",
      media: mediaPath || "media"
    },
    dataUriLimit: {
      svg: dataUriLimit,
      image: dataUriLimit,
      font: dataUriLimit,
      media: dataUriLimit
    },
    cssModuleLocalIdentName,
    disableCssExtract,
    disableCssModuleExtension,
    disableInlineRuntimeChunk,
    disableMinimize,
    disableSourceMap,
    disableTsChecker: disableTsChecker || enableTsLoader,
    enableCssModuleTSDeclaration,
    enableInlineScripts,
    enableInlineStyles,
    polyfill,
    disableFilenameHash: disableAssetsCache,
    enableLatestDecorators,
    ssg,
    // set `true`, only in legacy config
    enableAssetFallback: true,
    enableAssetManifest: true,
    disableNodePolyfill
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createOutputConfig
});
