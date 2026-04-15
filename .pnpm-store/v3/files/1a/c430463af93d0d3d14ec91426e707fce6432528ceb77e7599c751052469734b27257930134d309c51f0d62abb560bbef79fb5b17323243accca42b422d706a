import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { createBaseHookContext } from "./base";
import { RouterAPI } from "./routerApi";
import { TemplateApi } from "./template";
function getAfterMatchCtx(entryName, baseHookCtx) {
  var afterMatchCtx = baseHookCtx;
  afterMatchCtx.router = new RouterAPI(entryName);
  return afterMatchCtx;
}
function getAfterRenderCtx(c, baseHookCtx, route) {
  return _getAfterRenderCtx.apply(this, arguments);
}
function _getAfterRenderCtx() {
  _getAfterRenderCtx = _async_to_generator(function(c, baseHookCtx, route) {
    var afterRenderCtx, resBody;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          afterRenderCtx = baseHookCtx;
          return [
            4,
            c.res.text()
          ];
        case 1:
          resBody = _state.sent();
          afterRenderCtx.template = new TemplateApi(resBody);
          afterRenderCtx.route = route;
          return [
            2,
            afterRenderCtx
          ];
      }
    });
  });
  return _getAfterRenderCtx.apply(this, arguments);
}
function createCustomMiddlewaresCtx(c, locals, resArgs) {
  var _c_env_node, _c_env_node1;
  var baseContext = createBaseHookContext(c, resArgs);
  var reporter = c.get("reporter");
  var response = baseContext.response;
  response.locals = locals;
  return _object_spread_props(_object_spread({}, baseContext), {
    reporter,
    response,
    source: {
      req: (_c_env_node = c.env.node) === null || _c_env_node === void 0 ? void 0 : _c_env_node.req,
      res: (_c_env_node1 = c.env.node) === null || _c_env_node1 === void 0 ? void 0 : _c_env_node1.res
    }
  });
}
function createAfterStreamingRenderContext(baseHookCtx, route) {
  var streamingRenderCtx = baseHookCtx;
  streamingRenderCtx.route = route;
  return function(chunk) {
    streamingRenderCtx.chunk = chunk;
    return streamingRenderCtx;
  };
}
export {
  createAfterStreamingRenderContext,
  createCustomMiddlewaresCtx,
  getAfterMatchCtx,
  getAfterRenderCtx
};
