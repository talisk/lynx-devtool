"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var dependencyTree_exports = {};
__export(dependencyTree_exports, {
  DependencyTree: () => DependencyTree,
  defaultIgnores: () => defaultIgnores
});
module.exports = __toCommonJS(dependencyTree_exports);
var import_minimatch = __toESM(require("minimatch"));
const defaultIgnores = [
  "**/coverage/**",
  "**/node_modules/**",
  "**/.*/**",
  "**/*.d.ts",
  "**/*.log"
];
class DependencyTree {
  getNode(path) {
    return this.tree.get(path);
  }
  /**
  * update dependency tree
  *
  * @param cache
  */
  update(cache) {
    this.tree.clear();
    Object.keys(cache).forEach((path) => {
      if (!this.shouldIgnore(path)) {
        const module2 = cache[path];
        this.tree.set(module2.filename, {
          module: module2,
          parent: /* @__PURE__ */ new Set(),
          children: /* @__PURE__ */ new Set()
        });
      }
    });
    for (const treeNode of this.tree.values()) {
      const { parent } = treeNode.module;
      const { children } = treeNode.module;
      if (parent && !this.shouldIgnore(parent.filename)) {
        const parentTreeNode = this.tree.get(parent.filename);
        if (parentTreeNode) {
          treeNode.parent.add(parentTreeNode);
        }
      }
      children.forEach((child) => {
        if (!this.shouldIgnore(child.filename)) {
          const childTreeNode = this.tree.get(child.filename);
          if (childTreeNode) {
            treeNode.children.add(childTreeNode);
            childTreeNode.parent.add(treeNode);
          }
        }
      });
    }
  }
  shouldIgnore(path) {
    return !path || Boolean(this.ignore.find((rule) => import_minimatch.default.match([
      path
    ], rule, {
      dot: true
    }).length > 0));
  }
  constructor() {
    this.tree = /* @__PURE__ */ new Map();
    this.ignore = [
      ...defaultIgnores
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DependencyTree,
  defaultIgnores
});
