import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import { _ as _create_class } from "@swc/helpers/_/_create_class";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { getCookie } from "hono/cookie";
import { getHost } from "../../utils";
function createBaseHookContext(c, resParams) {
  var logger = c.get("logger");
  var metrics = c.get("metrics");
  return {
    request: new BaseHookRequest(c),
    response: new BaseHookResponse(c, resParams),
    logger,
    metrics
  };
}
var _req = /* @__PURE__ */ new WeakMap(), _c = /* @__PURE__ */ new WeakMap(), _headersData = /* @__PURE__ */ new WeakMap(), _headers = /* @__PURE__ */ new WeakMap();
var BaseHookRequest = /* @__PURE__ */ function() {
  "use strict";
  function BaseHookRequest2(c) {
    var _this = this;
    _class_call_check(this, BaseHookRequest2);
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
    var rawHeaders = _class_private_field_get(this, _req).raw.headers;
    rawHeaders.forEach(function(value, key) {
      _class_private_field_get(_this, _headersData)[key] = value;
    });
    _class_private_field_set(this, _headers, new Proxy(_class_private_field_get(this, _headersData), {
      get: function get(target, p) {
        return target[p];
      },
      set: function set(target, p, newValue) {
        target[p] = newValue;
        rawHeaders.set(p, newValue);
        return true;
      }
    }));
  }
  _create_class(BaseHookRequest2, [
    {
      key: "url",
      get: function get() {
        var query = _class_private_field_get(this, _c).req.query();
        var q = Object.entries(query).map(function(param) {
          var _param = _sliced_to_array(param, 2), key = _param[0], value = _param[1];
          return "".concat(key, "=").concat(value);
        }).join("&");
        return q ? "".concat(_class_private_field_get(this, _c).req.path, "?").concat(q) : _class_private_field_get(this, _c).req.path;
      },
      set: (
        // TODO: remove next major version
        function set(_u) {
        }
      )
    },
    {
      key: "host",
      get: function get() {
        return getHost(_class_private_field_get(this, _req).raw);
      },
      set: (
        // TODO: remove next major version
        function set(_h) {
        }
      )
    },
    {
      key: "pathname",
      get: function get() {
        return _class_private_field_get(this, _req).path;
      },
      set: (
        // TODO: remove next major version
        function set(_p) {
        }
      )
    },
    {
      key: "query",
      get: function get() {
        return _class_private_field_get(this, _req).query();
      },
      set: (
        // TODO: remove next major version
        function set(_q) {
        }
      )
    },
    {
      key: "headers",
      get: function get() {
        return _class_private_field_get(this, _headers);
      },
      set: (
        // TODO: remove next major version
        function set(_h) {
        }
      )
    },
    {
      key: "cookies",
      get: function get() {
        var _this = this;
        return {
          // FIXME: ModernRequest Type Error
          get: function(key) {
            return getCookie(_class_private_field_get(_this, _c), key);
          }
        };
      }
    },
    {
      key: "cookie",
      get: function get() {
        return _class_private_field_get(this, _req).header("cookie");
      },
      set: (
        // TODO: remove next major version
        function set(_c2) {
        }
      )
    }
  ]);
  return BaseHookRequest2;
}();
var _c1 = /* @__PURE__ */ new WeakMap(), _resArgs = /* @__PURE__ */ new WeakMap();
var BaseHookResponse = /* @__PURE__ */ function() {
  "use strict";
  function BaseHookResponse2(c, resArgs) {
    _class_call_check(this, BaseHookResponse2);
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
  var _proto = BaseHookResponse2.prototype;
  _proto.get = function get(key) {
    return _class_private_field_get(this, _c1).res.headers.get(key);
  };
  _proto.set = function set(key, value) {
    if ([
      "set-cookie",
      "Set-Cookie"
    ].includes(key)) {
      var _$_class_private_field_get;
      _class_private_field_get(this, _c1).header(key, value.toString(), {
        append: true
      });
      (_$_class_private_field_get = _class_private_field_get(this, _resArgs)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.headers.append(key, value.toString());
    } else {
      var _$_class_private_field_get1;
      _class_private_field_get(this, _c1).header(key, value.toString());
      (_$_class_private_field_get1 = _class_private_field_get(this, _resArgs)) === null || _$_class_private_field_get1 === void 0 ? void 0 : _$_class_private_field_get1.headers.set(key, value.toString());
    }
  };
  _proto.status = function status(code) {
    _class_private_field_get(this, _c1).status(code);
    _class_private_field_get(this, _resArgs) && (_class_private_field_get(this, _resArgs).status = code);
  };
  _proto.getStatus = function getStatus() {
    return _class_private_field_get(this, _c1).res.status;
  };
  _proto.raw = function raw(body, options) {
    _class_private_field_get(this, _c1).res = _class_private_field_get(this, _c1).newResponse(body, options);
    this.private_overrided = true;
  };
  _create_class(BaseHookResponse2, [
    {
      key: "cookies",
      get: function get() {
        var _this = this;
        var setCookie = function(key, value) {
          _class_private_field_get(_this, _c1).header("set-cookie", "".concat(key, "=").concat(value), {
            append: true
          });
        };
        var clearCookie = function() {
          _class_private_field_get(_this, _c1).header("set-cookie", void 0);
        };
        return {
          set: setCookie,
          clear: clearCookie
        };
      }
    }
  ]);
  return BaseHookResponse2;
}();
export {
  createBaseHookContext
};
