function createOutputConfig(config) {
  var _config_output = config.output, assetPrefix = _config_output.assetPrefix, copy = _config_output.copy, cssModuleLocalIdentName = _config_output.cssModuleLocalIdentName, cssPath = _config_output.cssPath, jsPath = _config_output.jsPath, htmlPath = _config_output.htmlPath, mediaPath = _config_output.mediaPath, enableTsLoader = _config_output.enableTsLoader, path = _config_output.path, disableInlineRuntimeChunk = _config_output.disableInlineRuntimeChunk, disableCssExtract = _config_output.disableCssExtract, disableMinimize = _config_output.disableMinimize, disableSourceMap = _config_output.disableSourceMap, disableTsChecker = _config_output.disableTsChecker, enableCssModuleTSDeclaration = _config_output.enableCssModuleTSDeclaration, enableInlineScripts = _config_output.enableInlineScripts, enableInlineStyles = _config_output.enableInlineStyles, polyfill = _config_output.polyfill, dataUriLimit = _config_output.dataUriLimit, disableAssetsCache = _config_output.disableAssetsCache, enableLatestDecorators = _config_output.enableLatestDecorators, disableCssModuleExtension = _config_output.disableCssModuleExtension, ssg = _config_output.ssg, disableNodePolyfill = _config_output.disableNodePolyfill;
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
export {
  createOutputConfig
};
