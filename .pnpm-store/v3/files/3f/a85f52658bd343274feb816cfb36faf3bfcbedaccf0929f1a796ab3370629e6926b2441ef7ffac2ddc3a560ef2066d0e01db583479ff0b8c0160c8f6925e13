import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import { getCookie } from "hono/cookie";
import { getHost } from "../../utils";
function createBaseHookContext(c, resParams) {
  const logger = c.get("logger");
  const metrics = c.get("metrics");
  return {
    request: new BaseHookRequest(c),
    response: new BaseHookResponse(c, resParams),
    logger,
    metrics
  };
}
var _req = /* @__PURE__ */ new WeakMap(), _c = /* @__PURE__ */ new WeakMap(), _headersData = /* @__PURE__ */ new WeakMap(), _headers = /* @__PURE__ */ new WeakMap();
class BaseHookRequest {
  get url() {
    const query = _class_private_field_get(this, _c).req.query();
    const q = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&");
    return q ? `${_class_private_field_get(this, _c).req.path}?${q}` : _class_private_field_get(this, _c).req.path;
  }
  // TODO: remove next major version
  set url(_u) {
  }
  get host() {
    return getHost(_class_private_field_get(this, _req).raw);
  }
  // TODO: remove next major version
  set host(_h) {
  }
  get pathname() {
    return _class_private_field_get(this, _req).path;
  }
  // TODO: remove next major version
  set pathname(_p) {
  }
  get query() {
    return _class_private_field_get(this, _req).query();
  }
  // TODO: remove next major version
  set query(_q) {
  }
  get headers() {
    return _class_private_field_get(this, _headers);
  }
  // TODO: remove next major version
  set headers(_h) {
  }
  get cookies() {
    return {
      // FIXME: ModernRequest Type Error
      get: (key) => {
        return getCookie(_class_private_field_get(this, _c), key);
      }
    };
  }
  get cookie() {
    return _class_private_field_get(this, _req).header("cookie");
  }
  // TODO: remove next major version
  set cookie(_c2) {
  }
  constructor(c) {
    _class_private_field_init(this, _req, {
      writable: true,
      value: void 0
    });
    _class_private_field_init(this, _c, {
      writable: true,
      value: void 0
    });
    _class_private_field_init(this, _headersData, {
      writable: true,
      value: void 0
    });
    _class_private_field_init(this, _headers, {
      writable: true,
      value: void 0
    });
    _class_private_field_set(this, _headersData, {});
    _class_private_field_set(this, _c, c);
    _class_private_field_set(this, _req, c.req);
    const rawHeaders = _class_private_field_get(this, _req).raw.headers;
    rawHeaders.forEach((value, key) => {
      _class_private_field_get(this, _headersData)[key] = value;
    });
    _class_private_field_set(this, _headers, new Proxy(_class_private_field_get(this, _headersData), {
      get(target, p) {
        return target[p];
      },
      set(target, p, newValue) {
        target[p] = newValue;
        rawHeaders.set(p, newValue);
        return true;
      }
    }));
  }
}
var _c1 = /* @__PURE__ */ new WeakMap(), _resArgs = /* @__PURE__ */ new WeakMap();
class BaseHookResponse {
  get(key) {
    return _class_private_field_get(this, _c1).res.headers.get(key);
  }
  set(key, value) {
    if ([
      "set-cookie",
      "Set-Cookie"
    ].includes(key)) {
      var _class_private_field_get1;
      _class_private_field_get(this, _c1).header(key, value.toString(), {
        append: true
      });
      (_class_private_field_get1 = _class_private_field_get(this, _resArgs)) === null || _class_private_field_get1 === void 0 ? void 0 : _class_private_field_get1.headers.append(key, value.toString());
    } else {
      var _class_private_field_get2;
      _class_private_field_get(this, _c1).header(key, value.toString());
      (_class_private_field_get2 = _class_private_field_get(this, _resArgs)) === null || _class_private_field_get2 === void 0 ? void 0 : _class_private_field_get2.headers.set(key, value.toString());
    }
  }
  status(code) {
    _class_private_field_get(this, _c1).status(code);
    _class_private_field_get(this, _resArgs) && (_class_private_field_get(this, _resArgs).status = code);
  }
  getStatus() {
    return _class_private_field_get(this, _c1).res.status;
  }
  get cookies() {
    const setCookie = (key, value) => {
      _class_private_field_get(this, _c1).header("set-cookie", `${key}=${value}`, {
        append: true
      });
    };
    const clearCookie = () => {
      _class_private_field_get(this, _c1).header("set-cookie", void 0);
    };
    return {
      set: setCookie,
      clear: clearCookie
    };
  }
  raw(body, options) {
    _class_private_field_get(this, _c1).res = _class_private_field_get(this, _c1).newResponse(body, options);
    this.private_overrided = true;
  }
  constructor(c, resArgs) {
    _class_private_field_init(this, _c1, {
      writable: true,
      value: void 0
    });
    _class_private_field_init(this, _resArgs, {
      writable: true,
      value: void 0
    });
    this.private_overrided = false;
    _class_private_field_set(this, _c1, c);
    _class_private_field_set(this, _resArgs, resArgs);
  }
}
export {
  createBaseHookContext
};
