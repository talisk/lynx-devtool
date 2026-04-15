import { formatImportPath } from "@modern-js/utils";
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
    return `export { default as requestHandler } from '${formatImportPath(customServerEntry.replace(srcDirectory, internalSrcAlias))}'`;
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
export {
  serverIndex
};
