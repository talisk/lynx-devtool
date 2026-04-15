import { formatImportPath } from "@modern-js/utils";
var SERVER_ENTRY = "\nimport {\n  #render,\n  createRequestHandler,\n} from '@#metaName/runtime/ssr/server';\n\nconst handleRequest = async (request, ServerRoot, options) => {\n\n  const body = await #render(request, <ServerRoot />, options);\n\n  return new Response(body, {\n    headers: {\n      'content-type': 'text/html; charset=utf-8',\n      #headers\n    },\n  })\n};\n\nexport const requestHandler = createRequestHandler(handleRequest);\n";
var serverIndex = function(options) {
  var _options_metaName = options.metaName, metaName = _options_metaName === void 0 ? "modern-js" : _options_metaName, entryName = options.entryName;
  return "\n    import '@".concat(metaName, "/runtime/registry/").concat(entryName, "';\n    ").concat(genHandlerCode(options), "\n  ");
};
function genHandlerCode(param) {
  var mode = param.mode, metaName = param.metaName, customServerEntry = param.customServerEntry, srcDirectory = param.srcDirectory, internalSrcAlias = param.internalSrcAlias;
  if (customServerEntry) {
    return "export { default as requestHandler } from '".concat(formatImportPath(customServerEntry.replace(srcDirectory, internalSrcAlias)), "'");
  } else {
    var serverEntry = transformServerEntry(SERVER_ENTRY, {
      metaName: metaName || "modern-js",
      mode
    });
    return serverEntry;
  }
}
function transformServerEntry(source, options) {
  var _options_metaName = options.metaName, metaName = _options_metaName === void 0 ? "modern-js" : _options_metaName, mode = options.mode;
  var output = source.replace(/#metaName/g, metaName).replace(/#render/g, mode === "string" ? "renderString" : "renderStreaming").replace(/#headers/g, mode === "string" ? "" : "'transfer-encoding': 'chunked',");
  return output;
}
export {
  serverIndex
};
