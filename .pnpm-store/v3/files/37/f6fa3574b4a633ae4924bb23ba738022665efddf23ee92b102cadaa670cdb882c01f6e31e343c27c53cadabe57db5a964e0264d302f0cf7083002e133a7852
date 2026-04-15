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
var template_server_exports = {};
__export(template_server_exports, {
  serverIndex: () => serverIndex
});
module.exports = __toCommonJS(template_server_exports);
var import_utils = require("@modern-js/utils");
const SERVER_ENTRY = `
import {
  #render,
  createRequestHandler,
} from '@#metaName/runtime/ssr/server';

const handleRequest = async (request, ServerRoot, options) => {

  const body = await #render(request, <ServerRoot />, options);

  return new Response(body, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      #headers
    },
  })
};

export const requestHandler = createRequestHandler(handleRequest);
`;
const serverIndex = (options) => {
  const { metaName = "modern-js", entryName } = options;
  return `
    import '@${metaName}/runtime/registry/${entryName}';
    ${genHandlerCode(options)}
  `;
};
function genHandlerCode({ mode, metaName, customServerEntry, srcDirectory, internalSrcAlias }) {
  if (customServerEntry) {
    return `export { default as requestHandler } from '${(0, import_utils.formatImportPath)(customServerEntry.replace(srcDirectory, internalSrcAlias))}'`;
  } else {
    const serverEntry = transformServerEntry(SERVER_ENTRY, {
      metaName: metaName || "modern-js",
      mode
    });
    return serverEntry;
  }
}
function transformServerEntry(source, options) {
  const { metaName = "modern-js", mode } = options;
  const output = source.replace(/#metaName/g, metaName).replace(/#render/g, mode === "string" ? "renderString" : "renderStreaming").replace(/#headers/g, mode === "string" ? "" : `'transfer-encoding': 'chunked',`);
  return output;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  serverIndex
});
