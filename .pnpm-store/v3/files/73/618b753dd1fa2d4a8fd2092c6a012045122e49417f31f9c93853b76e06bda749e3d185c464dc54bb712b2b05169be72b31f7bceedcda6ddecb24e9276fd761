import { parseHeaders } from "./request";
const ERROR_PAGE_TEXT = {
  404: "This page could not be found.",
  500: "Internal Server Error."
};
const createErrorHtml = (status) => {
  const text = ERROR_PAGE_TEXT[status] || "";
  const title = `${status}: ${text}`;
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>${title}</title>
    <style>
      html,body {
        margin: 0;
      }

      .page-container {
        color: #000;
        background: #fff;
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="page-container">
    <h1>${status}</h1>
    <div>${text}</div>
  </body>
  </html>
  `;
};
var ErrorDigest;
(function(ErrorDigest2) {
  ErrorDigest2["ENOTF"] = "Page could not be found";
  ErrorDigest2["EINTER"] = "Internal server error";
  ErrorDigest2["ERENDER"] = "SSR render failed";
})(ErrorDigest || (ErrorDigest = {}));
function onError(digest, error, monitors, req) {
  const headerData = req && parseHeaders(req);
  headerData && delete headerData.cookie;
  if (monitors) {
    monitors.error(req ? `Server Error - ${digest}, error = %s, req.url = %s, req.headers = %o` : `Server Error - ${digest}, error = %s`, error instanceof Error ? error.stack || error.message : error, req === null || req === void 0 ? void 0 : req.url, headerData);
  } else if (req) {
    console.error(`Server Error - ${digest}, error = ${error instanceof Error ? error.stack || error.message : error}, req.url = ${req.url}, req.headers = ${JSON.stringify(headerData)}`);
  } else {
    console.error(`Server Error - ${digest}, error = ${error instanceof Error ? error.stack || error.message : error} `);
  }
}
export {
  ErrorDigest,
  createErrorHtml,
  onError
};
