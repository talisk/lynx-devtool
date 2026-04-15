import { createBaseHookContext } from "./base";
import { RouterAPI } from "./routerApi";
import { TemplateApi } from "./template";
function getAfterMatchCtx(entryName, baseHookCtx) {
  const afterMatchCtx = baseHookCtx;
  afterMatchCtx.router = new RouterAPI(entryName);
  return afterMatchCtx;
}
async function getAfterRenderCtx(c, baseHookCtx, route) {
  const afterRenderCtx = baseHookCtx;
  const resBody = await c.res.text();
  afterRenderCtx.template = new TemplateApi(resBody);
  afterRenderCtx.route = route;
  return afterRenderCtx;
}
function createCustomMiddlewaresCtx(c, locals, resArgs) {
  var _c_env_node, _c_env_node1;
  const baseContext = createBaseHookContext(c, resArgs);
  const reporter = c.get("reporter");
  const response = baseContext.response;
  response.locals = locals;
  return {
    ...baseContext,
    reporter,
    response,
    source: {
      req: (_c_env_node = c.env.node) === null || _c_env_node === void 0 ? void 0 : _c_env_node.req,
      res: (_c_env_node1 = c.env.node) === null || _c_env_node1 === void 0 ? void 0 : _c_env_node1.res
    }
  };
}
function createAfterStreamingRenderContext(baseHookCtx, route) {
  const streamingRenderCtx = baseHookCtx;
  streamingRenderCtx.route = route;
  return (chunk) => {
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
