import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import path from "path";
import { fs, chokidar } from "@modern-js/utils";
import { DependencyTree } from "./dependencyTree";
import { StatsCache } from "./statsCache";
var defaultWatchOptions = {
  // 初始化的时候不触发 add、addDir 事件
  ignoreInitial: true,
  ignored: /api\/typings\/.*/
};
var getWatchedFiles = function(watcher) {
  var watched = watcher.getWatched();
  var files = [];
  Object.keys(watched).forEach(function(dir) {
    watched[dir].forEach(function(fileName) {
      files.push(path.join(dir, fileName));
    });
  });
  return files;
};
var mergeWatchOptions = function(options) {
  var watchOptions = _object_spread({}, options);
  if (watchOptions) {
    var ignored = watchOptions.ignored;
    var finalIgnored = ignored ? [
      defaultWatchOptions.ignored
    ].concat(_to_consumable_array(Array.isArray(ignored) ? ignored : [
      ignored
    ])) : ignored;
    if (finalIgnored) {
      watchOptions.ignored = finalIgnored;
    }
  }
  var finalWatchOptions = _object_spread({}, defaultWatchOptions, watchOptions);
  return finalWatchOptions;
};
var Watcher = /* @__PURE__ */ function() {
  "use strict";
  function Watcher2() {
    _class_call_check(this, Watcher2);
    this.dependencyTree = null;
  }
  var _proto = Watcher2.prototype;
  _proto.listen = function listen(files, options, callback) {
    var watched = files.filter(Boolean);
    var filenames = watched.map(function(filename) {
      return filename.replace(/\\/g, "/");
    });
    var cache = new StatsCache();
    var watcher = chokidar.watch(filenames, options);
    watcher.on("ready", function() {
      cache.add(getWatchedFiles(watcher));
    });
    watcher.on("change", function(changed) {
      if (!fs.existsSync(changed) || cache.isDiff(changed)) {
        cache.refresh(changed);
        callback(changed, "change");
      }
    });
    watcher.on("add", function(changed) {
      if (!cache.has(changed)) {
        cache.add([
          changed
        ]);
        callback(changed, "add");
      }
    });
    watcher.on("unlink", function(changed) {
      cache.del(changed);
      callback(changed, "unlink");
    });
    this.watcher = watcher;
  };
  _proto.createDepTree = function createDepTree() {
    this.dependencyTree = new DependencyTree();
  };
  _proto.updateDepTree = function updateDepTree() {
    var _this_dependencyTree;
    (_this_dependencyTree = this.dependencyTree) === null || _this_dependencyTree === void 0 ? void 0 : _this_dependencyTree.update(require.cache);
  };
  _proto.cleanDepCache = function cleanDepCache(filepath) {
    var _this_dependencyTree;
    var node = (_this_dependencyTree = this.dependencyTree) === null || _this_dependencyTree === void 0 ? void 0 : _this_dependencyTree.getNode(filepath);
    if (node && require.cache[filepath]) {
      delete require.cache[filepath];
      var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
      try {
        for (var _iterator = node.parent.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parentNode = _step.value;
          this.cleanDepCache(parentNode.module.filename);
        }
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
    }
  };
  _proto.close = function close() {
    return this.watcher.close();
  };
  return Watcher2;
}();
export {
  Watcher as default,
  defaultWatchOptions,
  getWatchedFiles,
  mergeWatchOptions
};
