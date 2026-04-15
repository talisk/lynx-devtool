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
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
  resolvePath: () => import_resolvePath.default
});
module.exports = __toCommonJS(src_exports);
var import_normalizeOptions = __toESM(require("./normalizeOptions"));
var import_resolvePath = __toESM(require("./resolvePath"));
var import_call = __toESM(require("./transformers/call"));
var import_import = __toESM(require("./transformers/import"));
const importVisitors = {
  CallExpression: import_call.default,
  "ImportDeclaration|ExportDeclaration": import_import.default
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
    this.normalizedOpts = (0, import_normalizeOptions.default)(currentFile, this.opts);
    this.moduleResolverVisited = /* @__PURE__ */ new Set();
  },
  visitor,
  post() {
    this.moduleResolverVisited.clear();
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolvePath
});
