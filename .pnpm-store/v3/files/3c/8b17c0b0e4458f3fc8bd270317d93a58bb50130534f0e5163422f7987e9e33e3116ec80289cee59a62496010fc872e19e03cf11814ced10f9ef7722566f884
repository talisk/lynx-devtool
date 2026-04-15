async function createBuilderGenerator(bundler) {
  if (bundler === "rspack") {
    const { createRspackBuilderForModern } = await import("./builder-rspack/index.js");
    return createRspackBuilderForModern;
  }
  const { createWebpackBuilderForModern } = await import("./builder-webpack/index.js");
  return createWebpackBuilderForModern;
}
export {
  createBuilderGenerator
};
