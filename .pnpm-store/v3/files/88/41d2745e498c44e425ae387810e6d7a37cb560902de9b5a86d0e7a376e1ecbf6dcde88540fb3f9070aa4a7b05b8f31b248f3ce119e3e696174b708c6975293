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
var transformStream_exports = {};
__export(transformStream_exports, {
  createTransformStream: () => createTransformStream,
  transformResponse: () => transformResponse
});
module.exports = __toCommonJS(transformStream_exports);
function createTransformStream(fn) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  return new TransformStream({
    async transform(chunk, controller) {
      const content = decoder.decode(chunk);
      const newContent = fn ? await fn(content) : content;
      controller.enqueue(encoder.encode(newContent));
    }
  });
}
function transformResponse(response, transformCb) {
  let readable = null;
  if (response.body) {
    const stream = createTransformStream(async (before) => {
      if (Array.isArray(transformCb)) {
        return transformCb.reduce(async (before2, cb) => {
          return cb(await before2);
        }, Promise.resolve(before));
      } else {
        return transformCb(before);
      }
    });
    response.body.pipeThrough(stream);
    readable = stream.readable;
  }
  return new Response(readable, {
    status: response.status,
    headers: response.headers,
    statusText: response.statusText
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTransformStream,
  transformResponse
});
