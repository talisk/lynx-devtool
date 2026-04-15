"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var context_exports = {};
__export(context_exports, {
  createAfterStreamingRenderContext: () => createAfterStreamingRenderContext,
  createCustomMiddlewaresCtx: () => createCustomMiddlewaresCtx,
  getAfterMatchCtx: () => getAfterMatchCtx,
  getAfterRenderCtx: () => getAfterRenderCtx
});
module.exports = __toCommonJS(context_exports);
var import_base = require("./base");
var import_routerApi = require("./routerApi");
var import_template = require("./template");
function getAfterMatchCtx(entryName, baseHookCtx) {
  const afterMatchCtx = baseHookCtx;
  afterMatchCtx.router = new import_routerApi.RouterAPI(entryName);
  return afterMatchCtx;
}
async function getAfterRenderCtx(c, baseHookCtx, route) {
  const afterRenderCtx = baseHookCtx;
  const resBody = await c.res.text();
  afterRenderCtx.template = new import_template.TemplateApi(resBody);
  afterRenderCtx.route = route;
  return afterRenderCtx;
}
function createCustomMiddlewaresCtx(c, locals, resArgs) {
  var _c_env_node, _c_env_node1;
  const baseContext = (0, import_base.createBaseHookContext)(c, resArgs);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAfterStreamingRenderContext,
  createCustomMiddlewaresCtx,
  getAfterMatchCtx,
  getAfterRenderCtx
});
