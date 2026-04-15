function createToolsConfig(config) {
  const { autoprefixer, babel, minifyCss, terser, webpack, webpackChain, tsLoader, styledComponents, sass, postcss, less, htmlPlugin, devServer, tailwindcss, jest, esbuild } = config.tools;
  const { enableTsLoader } = config.output;
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
