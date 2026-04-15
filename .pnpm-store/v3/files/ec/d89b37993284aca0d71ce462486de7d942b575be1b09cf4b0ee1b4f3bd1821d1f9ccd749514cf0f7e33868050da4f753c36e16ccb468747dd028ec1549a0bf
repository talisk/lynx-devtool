class HtmlAsyncChunkPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      const hooks = this.htmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap(this.name, (assets) => {
        const tags = [
          ...assets.headTags,
          ...assets.bodyTags
        ];
        for (const tag of tags) {
          if (tag.tagName === "script") {
            const { attributes } = tag;
            if (attributes && attributes.defer === true) {
              attributes.async = true;
              delete attributes.defer;
            }
          }
        }
        return assets;
      });
    });
  }
  constructor(htmlWebpackPlugin) {
    this.name = "HtmlAsyncChunkPlugin";
    this.htmlWebpackPlugin = htmlWebpackPlugin;
  }
}
export {
  HtmlAsyncChunkPlugin
};
