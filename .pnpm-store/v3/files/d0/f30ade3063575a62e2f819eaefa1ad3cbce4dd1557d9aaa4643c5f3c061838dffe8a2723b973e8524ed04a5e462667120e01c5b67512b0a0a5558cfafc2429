import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var RouterAPI = /* @__PURE__ */ function() {
  "use strict";
  function RouterAPI2(entryName) {
    _class_call_check(this, RouterAPI2);
    this.current = entryName;
    this.status = 200;
    this.url = "";
  }
  var _proto = RouterAPI2.prototype;
  _proto.redirect = function redirect(url) {
    var status = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 302;
    this.url = url;
    this.status = status;
  };
  _proto.rewrite = function rewrite(entryName) {
    this.current = entryName;
  };
  _proto.use = function use(entryName) {
    this.rewrite(entryName);
  };
  return RouterAPI2;
}();
export {
  RouterAPI
};
