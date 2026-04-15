import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var LoaderContext = /* @__PURE__ */ function() {
  "use strict";
  function LoaderContext2(defaultValue) {
    _class_call_check(this, LoaderContext2);
    this.defaultValue = defaultValue;
    this.symbol = Symbol("loaderContext");
  }
  var _proto = LoaderContext2.prototype;
  _proto.getDefaultValue = function getDefaultValue() {
    if (!this.defaultValue) {
      throw new Error("Can't get defaultValue before initialed");
    }
    return this.defaultValue;
  };
  return LoaderContext2;
}();
function createLoaderContext(defaultValue) {
  return new LoaderContext(defaultValue);
}
export {
  LoaderContext,
  createLoaderContext
};
