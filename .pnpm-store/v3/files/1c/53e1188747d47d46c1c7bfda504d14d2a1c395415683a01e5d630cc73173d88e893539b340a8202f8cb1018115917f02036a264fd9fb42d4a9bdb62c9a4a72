import path from "path";
import { fs, chokidar } from "@modern-js/utils";
import { DependencyTree } from "./dependencyTree";
import { StatsCache } from "./statsCache";
const defaultWatchOptions = {
  // 初始化的时候不触发 add、addDir 事件
  ignoreInitial: true,
  ignored: /api\/typings\/.*/
};
const getWatchedFiles = (watcher) => {
  const watched = watcher.getWatched();
  const files = [];
  Object.keys(watched).forEach((dir) => {
    watched[dir].forEach((fileName) => {
      files.push(path.join(dir, fileName));
    });
  });
  return files;
};
const mergeWatchOptions = (options) => {
  const watchOptions = {
    ...options
  };
  if (watchOptions) {
    const { ignored } = watchOptions;
    const finalIgnored = ignored ? [
      defaultWatchOptions.ignored,
      ...Array.isArray(ignored) ? ignored : [
        ignored
      ]
    ] : ignored;
    if (finalIgnored) {
      watchOptions.ignored = finalIgnored;
    }
  }
  const finalWatchOptions = {
    ...defaultWatchOptions,
    ...watchOptions
  };
  return finalWatchOptions;
};
class Watcher {
  listen(files, options, callback) {
    const watched = files.filter(Boolean);
    const filenames = watched.map((filename) => filename.replace(/\\/g, "/"));
    const cache = new StatsCache();
    const watcher = chokidar.watch(filenames, options);
    watcher.on("ready", () => {
      cache.add(getWatchedFiles(watcher));
    });
    watcher.on("change", (changed) => {
      if (!fs.existsSync(changed) || cache.isDiff(changed)) {
        cache.refresh(changed);
        callback(changed, "change");
      }
    });
    watcher.on("add", (changed) => {
      if (!cache.has(changed)) {
        cache.add([
          changed
        ]);
        callback(changed, "add");
      }
    });
    watcher.on("unlink", (changed) => {
      cache.del(changed);
      callback(changed, "unlink");
    });
    this.watcher = watcher;
  }
  createDepTree() {
    this.dependencyTree = new DependencyTree();
  }
  updateDepTree() {
    var _this_dependencyTree;
    (_this_dependencyTree = this.dependencyTree) === null || _this_dependencyTree === void 0 ? void 0 : _this_dependencyTree.update(require.cache);
  }
  cleanDepCache(filepath) {
    var _this_dependencyTree;
    const node = (_this_dependencyTree = this.dependencyTree) === null || _this_dependencyTree === void 0 ? void 0 : _this_dependencyTree.getNode(filepath);
    if (node && require.cache[filepath]) {
      delete require.cache[filepath];
      for (const parentNode of node.parent.values()) {
        this.cleanDepCache(parentNode.module.filename);
      }
    }
  }
  close() {
    return this.watcher.close();
  }
  constructor() {
    this.dependencyTree = null;
  }
}
export {
  Watcher as default,
  defaultWatchOptions,
  getWatchedFiles,
  mergeWatchOptions
};
