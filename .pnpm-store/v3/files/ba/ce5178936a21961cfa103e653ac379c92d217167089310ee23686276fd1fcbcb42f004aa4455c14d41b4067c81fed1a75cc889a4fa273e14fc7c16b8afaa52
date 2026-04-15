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
var getCssSupport_exports = {};
__export(getCssSupport_exports, {
  getCssSupport: () => getCssSupport
});
module.exports = __toCommonJS(getCssSupport_exports);
var import_browserslist = __toESM(require("browserslist"));
const CSS_FEATURES_BROWSER = {
  customProperties: {
    and_chr: "49",
    and_ff: "31",
    android: "50",
    chrome: "49",
    edge: "15",
    firefox: "31",
    ios_saf: "9.3",
    op_mob: "36",
    opera: "36",
    safari: "9.1",
    samsung: "5.0"
  },
  initial: {
    and_chr: "37",
    and_ff: "27",
    android: "37",
    chrome: "37",
    edge: "79",
    firefox: "27",
    ios_saf: "9.3",
    op_mob: "24",
    opera: "24",
    safari: "9.1",
    samsung: "3.0"
  },
  pageBreak: {
    and_chr: "51",
    and_ff: "92",
    android: "51",
    chrome: "51",
    edge: "12",
    firefox: "92",
    ios_saf: "10",
    op_mob: "37",
    opera: "11.1",
    safari: "10",
    samsung: "5.0"
  },
  fontVariant: {
    and_chr: "18",
    and_ff: "34",
    android: "4.4",
    chrome: "1",
    edge: "12",
    firefox: "34",
    ios_saf: "9.3",
    op_mob: "12",
    opera: "10",
    safari: "9.1",
    samsung: "1.0"
  },
  mediaMinmax: {
    and_chr: "104",
    and_ff: "109",
    android: "104",
    chrome: "104",
    edge: "104",
    firefox: "63",
    opera: "91"
  }
};
const getCssFeatureBrowsers = (feature) => {
  const featureBrowsers = CSS_FEATURES_BROWSER[feature];
  return (0, import_browserslist.default)(Object.entries(featureBrowsers).map(([key, value]) => `${key} >= ${value}`));
};
const isFeatureSupported = (projectBrowsers, featureBrowsers) => projectBrowsers.every((item) => featureBrowsers.includes(item));
function getCssSupport(projectBrowserslist) {
  const projectBrowsers = (0, import_browserslist.default)(projectBrowserslist);
  return Object.keys(CSS_FEATURES_BROWSER).reduce((acc, key) => {
    acc[key] = isFeatureSupported(projectBrowsers, getCssFeatureBrowsers(key));
    return acc;
  }, {});
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCssSupport
});
