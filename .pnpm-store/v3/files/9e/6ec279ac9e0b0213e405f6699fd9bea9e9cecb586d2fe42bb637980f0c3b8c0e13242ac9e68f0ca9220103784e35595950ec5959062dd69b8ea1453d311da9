import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
function createBuilderGenerator(bundler) {
  return _createBuilderGenerator.apply(this, arguments);
}
function _createBuilderGenerator() {
  _createBuilderGenerator = _async_to_generator(function(bundler) {
    var createRspackBuilderForModern, createWebpackBuilderForModern;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          if (!(bundler === "rspack"))
            return [
              3,
              2
            ];
          return [
            4,
            import("./builder-rspack/index.js")
          ];
        case 1:
          createRspackBuilderForModern = _state.sent().createRspackBuilderForModern;
          return [
            2,
            createRspackBuilderForModern
          ];
        case 2:
          return [
            4,
            import("./builder-webpack/index.js")
          ];
        case 3:
          createWebpackBuilderForModern = _state.sent().createWebpackBuilderForModern;
          return [
            2,
            createWebpackBuilderForModern
          ];
      }
    });
  });
  return _createBuilderGenerator.apply(this, arguments);
}
export {
  createBuilderGenerator
};
