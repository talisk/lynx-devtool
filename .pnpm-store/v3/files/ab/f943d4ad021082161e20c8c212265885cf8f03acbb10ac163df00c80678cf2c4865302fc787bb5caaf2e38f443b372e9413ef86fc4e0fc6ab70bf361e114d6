import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import Fs from "@modern-js/utils/fs-extra";
import { createMemoryStorage } from "./storer";
var FileReader = /* @__PURE__ */ function() {
  "use strict";
  function FileReader2(storage) {
    _class_call_check(this, FileReader2);
    this.fs = Fs;
    this.storage = storage;
  }
  var _proto = FileReader2.prototype;
  _proto.readFile = function readFile(path) {
    var encoding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "utf-8";
    var _this = this;
    return _async_to_generator(function() {
      var fs, cache, isExistFile, content;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            fs = _this.fs;
            return [
              4,
              _this.storage.get(path)
            ];
          case 1:
            cache = _state.sent();
            if (cache === null) {
              return [
                2,
                null
              ];
            }
            if (cache) {
              return [
                2,
                _this.encodingContent(cache, encoding)
              ];
            }
            return [
              4,
              new Promise(function(resolve) {
                fs.stat(path, function(err, stats) {
                  if (err) {
                    resolve(false);
                    return;
                  }
                  if (stats.isFile()) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
              })
            ];
          case 2:
            isExistFile = _state.sent();
            if (!isExistFile)
              return [
                3,
                4
              ];
            return [
              4,
              fs.promises.readFile(path)
            ];
          case 3:
            content = _state.sent();
            _this.storage.set(path, content);
            return [
              2,
              _this.encodingContent(content, encoding)
            ];
          case 4:
            _this.storage.set(path, null);
            return [
              2,
              null
            ];
          case 5:
            return [
              2
            ];
        }
      });
    })();
  };
  _proto.reset = function reset(fs) {
    var _this_storage_clear, _this_storage;
    fs && (this.fs = fs);
    return (_this_storage_clear = (_this_storage = this.storage).clear) === null || _this_storage_clear === void 0 ? void 0 : _this_storage_clear.call(_this_storage);
  };
  _proto.encodingContent = function encodingContent(value, encoding) {
    if (encoding === "utf-8") {
      return value.toString();
    }
    return value;
  };
  return FileReader2;
}();
var fileReader = new FileReader(createMemoryStorage("__file__system"));
export {
  FileReader,
  fileReader
};
