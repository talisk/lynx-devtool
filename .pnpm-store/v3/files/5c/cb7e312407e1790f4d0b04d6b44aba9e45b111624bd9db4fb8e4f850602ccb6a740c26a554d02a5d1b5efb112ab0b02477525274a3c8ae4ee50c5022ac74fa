import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { fileReader } from "@modern-js/runtime-utils/fileReader";
var initFileReader = function() {
  var isInit = false;
  return function() {
    var _ref = _async_to_generator(function(ctx, next) {
      var _res_locals, res, _res_locals_webpack, webpackDevMid, outputFileSystem;
      return _ts_generator(this, function(_state) {
        if (isInit) {
          return [
            2,
            next()
          ];
        }
        isInit = true;
        res = ctx.env.node.res;
        if (!((_res_locals = res.locals) === null || _res_locals === void 0 ? void 0 : _res_locals.webpack)) {
          fileReader.reset();
          return [
            2,
            next()
          ];
        }
        _res_locals_webpack = res.locals.webpack, webpackDevMid = _res_locals_webpack.devMiddleware;
        outputFileSystem = webpackDevMid.outputFileSystem;
        if (outputFileSystem) {
          fileReader.reset(outputFileSystem);
        } else {
          fileReader.reset();
        }
        return [
          2,
          next()
        ];
      });
    });
    return function(ctx, next) {
      return _ref.apply(this, arguments);
    };
  }();
};
export {
  initFileReader
};
