function createToolsConfig(config) {
  var _config_tools = config.tools, autoprefixer = _config_tools.autoprefixer, babel = _config_tools.babel, minifyCss = _config_tools.minifyCss, terser = _config_tools.terser, webpack = _config_tools.webpack, webpackChain = _config_tools.webpackChain, tsLoader = _config_tools.tsLoader, styledComponents = _config_tools.styledComponents, sass = _config_tools.sass, postcss = _config_tools.postcss, less = _config_tools.less, htmlPlugin = _config_tools.htmlPlugin, devServer = _config_tools.devServer, tailwindcss = _config_tools.tailwindcss, jest = _config_tools.jest, esbuild = _config_tools.esbuild;
  var enableTsLoader = config.output.enableTsLoader;
  return {
    tsLoader: enableTsLoader ? tsLoader : void 0,
    autoprefixer,
    babel,
    minifyCss,
    terser,
    webpack,
    webpackChain,
    styledComponents,
    sass,
    postcss,
    less,
    htmlPlugin,
    devServer,
    tailwindcss,
    jest,
    esbuild: {
      loader: false,
      minimize: esbuild
    }
  };
}
export {
  createToolsConfig
};
