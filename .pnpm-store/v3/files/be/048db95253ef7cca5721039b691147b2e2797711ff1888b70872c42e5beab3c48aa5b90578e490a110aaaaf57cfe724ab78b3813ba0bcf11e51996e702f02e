import normalizeOptions from "./normalizeOptions";
import resolvePath from "./resolvePath";
import transformCall from "./transformers/call";
import transformImport from "./transformers/import";
const importVisitors = {
  CallExpression: transformCall,
  "ImportDeclaration|ExportDeclaration": transformImport
};
const visitor = {
  Program: {
    enter(programPath, state) {
      programPath.traverse(importVisitors, state);
    },
    exit(programPath, state) {
      programPath.traverse(importVisitors, state);
    }
  }
};
var src_default = ({ types }) => ({
  name: "module-resolver",
  manipulateOptions(opts) {
    if (opts.filename === void 0) {
      opts.filename = "unknown";
    }
  },
  pre(file) {
    this.types = types;
    const currentFile = file.opts.filename;
    this.normalizedOpts = normalizeOptions(currentFile, this.opts);
    this.moduleResolverVisited = /* @__PURE__ */ new Set();
  },
  visitor,
  post() {
    this.moduleResolverVisited.clear();
  }
});
export {
  src_default as default,
  resolvePath
};
