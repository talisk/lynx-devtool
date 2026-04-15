import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { parseHeaders } from "./request";
var ERROR_PAGE_TEXT = {
  404: "This page could not be found.",
  500: "Internal Server Error."
};
var createErrorHtml = function(status) {
  var text = ERROR_PAGE_TEXT[status] || "";
  var title = "".concat(status, ": ").concat(text);
  return '<!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width">\n    <title>'.concat(title, '</title>\n    <style>\n      html,body {\n        margin: 0;\n      }\n\n      .page-container {\n        color: #000;\n        background: #fff;\n        height: 100vh;\n        text-align: center;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n      }\n    </style>\n  </head>\n  <body>\n    <div class="page-container">\n    <h1>').concat(status, "</h1>\n    <div>").concat(text, "</div>\n  </body>\n  </html>\n  ");
};
var ErrorDigest;
(function(ErrorDigest2) {
  ErrorDigest2["ENOTF"] = "Page could not be found";
  ErrorDigest2["EINTER"] = "Internal server error";
  ErrorDigest2["ERENDER"] = "SSR render failed";
})(ErrorDigest || (ErrorDigest = {}));
function onError(digest, error, monitors, req) {
  var headerData = req && parseHeaders(req);
  headerData && delete headerData.cookie;
  if (monitors) {
    monitors.error(req ? "Server Error - ".concat(digest, ", error = %s, req.url = %s, req.headers = %o") : "Server Error - ".concat(digest, ", error = %s"), _instanceof(error, Error) ? error.stack || error.message : error, req === null || req === void 0 ? void 0 : req.url, headerData);
  } else if (req) {
    console.error("Server Error - ".concat(digest, ", error = ").concat(_instanceof(error, Error) ? error.stack || error.message : error, ", req.url = ").concat(req.url, ", req.headers = ").concat(JSON.stringify(headerData)));
  } else {
    console.error("Server Error - ".concat(digest, ", error = ").concat(_instanceof(error, Error) ? error.stack || error.message : error, " "));
  }
}
export {
  ErrorDigest,
  createErrorHtml,
  onError
};
