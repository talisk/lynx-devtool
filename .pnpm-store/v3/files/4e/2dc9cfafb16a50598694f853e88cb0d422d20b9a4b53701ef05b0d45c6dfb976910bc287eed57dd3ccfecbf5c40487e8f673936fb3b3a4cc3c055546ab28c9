import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import minimatch from "minimatch";
var defaultIgnores = [
  "**/coverage/**",
  "**/node_modules/**",
  "**/.*/**",
  "**/*.d.ts",
  "**/*.log"
];
var DependencyTree = /* @__PURE__ */ function() {
  "use strict";
  function DependencyTree2() {
    _class_call_check(this, DependencyTree2);
    this.tree = /* @__PURE__ */ new Map();
    this.ignore = _to_consumable_array(defaultIgnores);
  }
  var _proto = DependencyTree2.prototype;
  _proto.getNode = function getNode(path) {
    return this.tree.get(path);
  };
  _proto.update = function update(cache) {
    var _this = this;
    this.tree.clear();
    Object.keys(cache).forEach(function(path) {
      if (!_this.shouldIgnore(path)) {
        var module = cache[path];
        _this.tree.set(module.filename, {
          module,
          parent: /* @__PURE__ */ new Set(),
          children: /* @__PURE__ */ new Set()
        });
      }
    });
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      var _this1, _loop = function() {
        var treeNode = _step.value;
        var parent = treeNode.module.parent;
        var children = treeNode.module.children;
        if (parent && !_this1.shouldIgnore(parent.filename)) {
          var parentTreeNode = _this1.tree.get(parent.filename);
          if (parentTreeNode) {
            treeNode.parent.add(parentTreeNode);
          }
        }
        children.forEach(function(child) {
          if (!_this.shouldIgnore(child.filename)) {
            var childTreeNode = _this.tree.get(child.filename);
            if (childTreeNode) {
              treeNode.children.add(childTreeNode);
              childTreeNode.parent.add(treeNode);
            }
          }
        });
      };
      for (var _iterator = this.tree.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)
        _this1 = this, _loop();
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
  _proto.shouldIgnore = function shouldIgnore(path) {
    return !path || Boolean(this.ignore.find(function(rule) {
      return minimatch.match([
        path
      ], rule, {
        dot: true
      }).length > 0;
    }));
  };
  return DependencyTree2;
}();
export {
  DependencyTree,
  defaultIgnores
};
