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
var base_exports = {};
__export(base_exports, {
  createBaseHookContext: () => createBaseHookContext
});
module.exports = __toCommonJS(base_exports);
var import_class_private_field_get = require("@swc/helpers/_/_class_private_field_get");
var import_class_private_field_init = require("@swc/helpers/_/_class_private_field_init");
var import_class_private_field_set = require("@swc/helpers/_/_class_private_field_set");
var import_cookie = require("hono/cookie");
var import_utils = require("../../utils");
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
    const query = (0, import_class_private_field_get._)(this, _c).req.query();
    const q = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&");
    return q ? `${(0, import_class_private_field_get._)(this, _c).req.path}?${q}` : (0, import_class_private_field_get._)(this, _c).req.path;
  }
  // TODO: remove next major version
  set url(_u) {
  }
  get host() {
    return (0, import_utils.getHost)((0, import_class_private_field_get._)(this, _req).raw);
  }
  // TODO: remove next major version
  set host(_h) {
  }
  get pathname() {
    return (0, import_class_private_field_get._)(this, _req).path;
  }
  // TODO: remove next major version
  set pathname(_p) {
  }
  get query() {
    return (0, import_class_private_field_get._)(this, _req).query();
  }
  // TODO: remove next major version
  set query(_q) {
  }
  get headers() {
    return (0, import_class_private_field_get._)(this, _headers);
  }
  // TODO: remove next major version
  set headers(_h) {
  }
  get cookies() {
    return {
      // FIXME: ModernRequest Type Error
      get: (key) => {
        return (0, import_cookie.getCookie)((0, import_class_private_field_get._)(this, _c), key);
      }
    };
  }
  get cookie() {
    return (0, import_class_private_field_get._)(this, _req).header("cookie");
  }
  // TODO: remove next major version
  set cookie(_c2) {
  }
  constructor(c) {
    (0, import_class_private_field_init._)(this, _req, {
      writable: true,
      value: void 0
    });
    (0, import_class_private_field_init._)(this, _c, {
      writable: true,
      value: void 0
    });
    (0, import_class_private_field_init._)(this, _headersData, {
      writable: true,
      value: void 0
    });
    (0, import_class_private_field_init._)(this, _headers, {
      writable: true,
      value: void 0
    });
    (0, import_class_private_field_set._)(this, _headersData, {});
    (0, import_class_private_field_set._)(this, _c, c);
    (0, import_class_private_field_set._)(this, _req, c.req);
    const rawHeaders = (0, import_class_private_field_get._)(this, _req).raw.headers;
    rawHeaders.forEach((value, key) => {
      (0, import_class_private_field_get._)(this, _headersData)[key] = value;
    });
    (0, import_class_private_field_set._)(this, _headers, new Proxy((0, import_class_private_field_get._)(this, _headersData), {
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
    return (0, import_class_private_field_get._)(this, _c1).res.headers.get(key);
  }
  set(key, value) {
    if ([
      "set-cookie",
      "Set-Cookie"
    ].includes(key)) {
      var _class_private_field_get1;
      (0, import_class_private_field_get._)(this, _c1).header(key, value.toString(), {
        append: true
      });
      (_class_private_field_get1 = (0, import_class_private_field_get._)(this, _resArgs)) === null || _class_private_field_get1 === void 0 ? void 0 : _class_private_field_get1.headers.append(key, value.toString());
    } else {
      var _class_private_field_get2;
      (0, import_class_private_field_get._)(this, _c1).header(key, value.toString());
      (_class_private_field_get2 = (0, import_class_private_field_get._)(this, _resArgs)) === null || _class_private_field_get2 === void 0 ? void 0 : _class_private_field_get2.headers.set(key, value.toString());
    }
  }
  status(code) {
    (0, import_class_private_field_get._)(this, _c1).status(code);
    (0, import_class_private_field_get._)(this, _resArgs) && ((0, import_class_private_field_get._)(this, _resArgs).status = code);
  }
  getStatus() {
    return (0, import_class_private_field_get._)(this, _c1).res.status;
  }
  get cookies() {
    const setCookie = (key, value) => {
      (0, import_class_private_field_get._)(this, _c1).header("set-cookie", `${key}=${value}`, {
        append: true
      });
    };
    const clearCookie = () => {
      (0, import_class_private_field_get._)(this, _c1).header("set-cookie", void 0);
    };
    return {
      set: setCookie,
      clear: clearCookie
    };
  }
  raw(body, options) {
    (0, import_class_private_field_get._)(this, _c1).res = (0, import_class_private_field_get._)(this, _c1).newResponse(body, options);
    this.private_overrided = true;
  }
  constructor(c, resArgs) {
    (0, import_class_private_field_init._)(this, _c1, {
      writable: true,
      value: void 0
    });
    (0, import_class_private_field_init._)(this, _resArgs, {
      writable: true,
      value: void 0
    });
    this.private_overrided = false;
    (0, import_class_private_field_set._)(this, _c1, c);
    (0, import_class_private_field_set._)(this, _resArgs, resArgs);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBaseHookContext
});
