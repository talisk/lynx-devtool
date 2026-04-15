import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var TypescriptLoader = /* @__PURE__ */ function() {
  "use strict";
  function TypescriptLoader2(param) {
    var appDirectory = param.appDirectory;
    _class_call_check(this, TypescriptLoader2);
    this.appDirectory = appDirectory;
  }
  var _proto = TypescriptLoader2.prototype;
  _proto.load = function load() {
    if (this.tsBinary) {
      return this.tsBinary;
    }
    try {
      var tsPath = require.resolve("typescript", {
        paths: [
          this.appDirectory || process.cwd()
        ]
      });
      var ts = require(tsPath);
      return ts;
    } catch (error) {
      throw new Error('TypeScript could not be found! Please, install "typescript" package.');
    }
  };
  return TypescriptLoader2;
}();
export {
  TypescriptLoader
};
