function parseQuery(req) {
  const query = {};
  const { url } = req;
  const q = url.split("?")[1];
  if (q) {
    const search = new URLSearchParams(q);
    search.forEach((v, k) => {
      query[k] = v;
    });
  }
  return query;
}
function parseHeaders(request) {
  const headersData = {};
  request.headers.forEach((value, key) => {
    headersData[key] = value;
  });
  return headersData;
}
function getPathname(request) {
  const match = request.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return match ? match[1] : "/";
}
function getHost(request) {
  const { headers } = request;
  let host = headers.get("X-Forwarded-Host");
  if (!host) {
    host = headers.get("Host");
  }
  host = (host === null || host === void 0 ? void 0 : host.split(/\s*,\s*/, 1)[0]) || "undefined";
  return host;
}
function parseCookie(req) {
  const _cookie = req.headers.get("Cookie");
  const cookie = {};
  _cookie === null || _cookie === void 0 ? void 0 : _cookie.trim().split(";").forEach((item) => {
    const [k, v] = item.trim().split("=");
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
