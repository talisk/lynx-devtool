import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { REPLACE_REG } from "../../constants";
var TemplateApi = /* @__PURE__ */ function() {
  "use strict";
  function TemplateApi2(body) {
    _class_call_check(this, TemplateApi2);
    this.body = body;
  }
  var _proto = TemplateApi2.prototype;
  _proto.set = function set(content) {
    this.body = content;
  };
  _proto.get = function get() {
    return this.body;
  };
  _proto.prependHead = function prependHead(fragment) {
    var head = REPLACE_REG.before.head;
    this.replaceBody(new RegExp(head), function(beforeHead) {
      return "".concat(beforeHead).concat(fragment);
    });
  };
  _proto.appendHead = function appendHead(fragment) {
    var head = REPLACE_REG.after.head;
    this.replaceBody(head, function() {
      return "".concat(fragment).concat(head);
    });
  };
  _proto.prependBody = function prependBody(fragment) {
    var body = REPLACE_REG.before.body;
    this.replaceBody(new RegExp(body), function(beforeBody) {
      return "".concat(beforeBody).concat(fragment);
    });
  };
  _proto.appendBody = function appendBody(fragment) {
    var body = REPLACE_REG.after.body;
    this.replaceBody(body, function() {
      return "".concat(fragment).concat(body);
    });
  };
  _proto.replaceBody = function replaceBody(searchValue, replaceCb) {
    this.body = this.body.replace(searchValue, replaceCb);
  };
  return TemplateApi2;
}();
export {
  TemplateApi
};
