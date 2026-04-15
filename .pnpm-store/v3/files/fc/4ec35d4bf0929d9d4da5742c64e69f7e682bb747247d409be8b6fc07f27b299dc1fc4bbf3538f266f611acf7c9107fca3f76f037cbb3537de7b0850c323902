import minimatch from "minimatch";
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
        const module = cache[path];
        this.tree.set(module.filename, {
          module,
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
    return !path || Boolean(this.ignore.find((rule) => minimatch.match([
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
export {
  DependencyTree,
  defaultIgnores
};
