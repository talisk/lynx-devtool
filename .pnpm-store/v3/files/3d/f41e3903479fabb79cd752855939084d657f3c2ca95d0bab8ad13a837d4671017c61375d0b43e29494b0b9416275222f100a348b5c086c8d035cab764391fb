import normalizeOptions from "./normalizeOptions";
import resolvePath from "./resolvePath";
import transformCall from "./transformers/call";
import transformImport from "./transformers/import";
var importVisitors = {
  CallExpression: transformCall,
  "ImportDeclaration|ExportDeclaration": transformImport
};
var visitor = {
  Program: {
    enter: function enter(programPath, state) {
      programPath.traverse(importVisitors, state);
    },
    exit: function exit(programPath, state) {
      programPath.traverse(importVisitors, state);
    }
  }
};
function src_default(param) {
  var types = param.types;
  return {
    name: "module-resolver",
    manipulateOptions: function manipulateOptions(opts) {
      if (opts.filename === void 0) {
        opts.filename = "unknown";
      }
    },
    pre: function pre(file) {
      this.types = types;
      var currentFile = file.opts.filename;
      this.normalizedOpts = normalizeOptions(currentFile, this.opts);
      this.moduleResolverVisited = /* @__PURE__ */ new Set();
    },
    visitor,
    post: function post() {
      this.moduleResolverVisited.clear();
    }
  };
}
;
export {
  src_default as default,
  resolvePath
};
