import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
function parseQuery(req) {
  var query = {};
  var url = req.url;
  var q = url.split("?")[1];
  if (q) {
    var search = new URLSearchParams(q);
    search.forEach(function(v, k) {
      query[k] = v;
    });
  }
  return query;
}
function parseHeaders(request) {
  var headersData = {};
  request.headers.forEach(function(value, key) {
    headersData[key] = value;
  });
  return headersData;
}
function getPathname(request) {
  var match = request.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return match ? match[1] : "/";
}
function getHost(request) {
  var headers = request.headers;
  var host = headers.get("X-Forwarded-Host");
  if (!host) {
    host = headers.get("Host");
  }
  host = (host === null || host === void 0 ? void 0 : host.split(/\s*,\s*/, 1)[0]) || "undefined";
  return host;
}
function parseCookie(req) {
  var _cookie = req.headers.get("Cookie");
  var cookie = {};
  _cookie === null || _cookie === void 0 ? void 0 : _cookie.trim().split(";").forEach(function(item) {
    var _item_trim_split = _sliced_to_array(item.trim().split("="), 2), k = _item_trim_split[0], v = _item_trim_split[1];
    if (k) {
      cookie[k] = v;
    }
  });
  return cookie;
}
export {
  getHost,
  getPathname,
  parseCookie,
  parseHeaders,
  parseQuery
};
