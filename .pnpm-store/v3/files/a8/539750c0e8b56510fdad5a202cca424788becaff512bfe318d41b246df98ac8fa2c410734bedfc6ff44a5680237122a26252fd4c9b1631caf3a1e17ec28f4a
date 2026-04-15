import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _create_class } from "@swc/helpers/_/_create_class";
var CompilerErrorResult = /* @__PURE__ */ function() {
  "use strict";
  function CompilerErrorResult2(initErrorResult) {
    _class_call_check(this, CompilerErrorResult2);
    this.init(initErrorResult);
  }
  var _proto = CompilerErrorResult2.prototype;
  _proto.init = function init(initErrorResult) {
    this._messageDetails = (initErrorResult === null || initErrorResult === void 0 ? void 0 : initErrorResult.messageDetails) || [];
  };
  _proto.update = function update(messageDetails) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      var _this, _loop = function() {
        var messageDetail = _step.value;
        var addError = !_this._messageDetails.some(function(detail) {
          if (detail.filename === messageDetail.filename) {
            detail.content = messageDetail.content;
            return true;
          }
          return false;
        });
        if (addError) {
          _this._messageDetails.push(messageDetail);
        }
      };
      for (var _iterator = messageDetails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)
        _this = this, _loop();
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
  _proto.removeByFileName = function removeByFileName(filename) {
    this._messageDetails = this._messageDetails.filter(function(detail) {
      return detail.filename !== filename;
    });
  };
  _proto.checkExistError = function checkExistError() {
    return this._messageDetails.length > 0;
  };
  _create_class(CompilerErrorResult2, [
    {
      key: "value",
      get: function get() {
        var _this__messageDetails;
        return {
          code: 1,
          message: "Compilation failure ".concat((_this__messageDetails = this._messageDetails) === null || _this__messageDetails === void 0 ? void 0 : _this__messageDetails.length, " files with Babel."),
          messageDetails: this._messageDetails
        };
      }
    }
  ]);
  return CompilerErrorResult2;
}();
export {
  CompilerErrorResult
};
