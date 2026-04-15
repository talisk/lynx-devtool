import { fileReader } from "@modern-js/runtime-utils/fileReader";
const initFileReader = () => {
  let isInit = false;
  return async (ctx, next) => {
    var _res_locals;
    if (isInit) {
      return next();
    }
    isInit = true;
    const { res } = ctx.env.node;
    if (!((_res_locals = res.locals) === null || _res_locals === void 0 ? void 0 : _res_locals.webpack)) {
      fileReader.reset();
      return next();
    }
    const { devMiddleware: webpackDevMid } = res.locals.webpack;
    const { outputFileSystem } = webpackDevMid;
    if (outputFileSystem) {
      fileReader.reset(outputFileSystem);
    } else {
      fileReader.reset();
    }
    return next();
  };
};
export {
  initFileReader
};
