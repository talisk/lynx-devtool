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
var prerender_exports = {};
__export(prerender_exports, {
  PreRender: () => PreRender
});
module.exports = __toCommonJS(prerender_exports);
var import_react = __toESM(require("react"));
var import_react_side_effect = __toESM(require("react-side-effect"));
var import_util = require("./util");
const PROP_NAMES = {
  INTERVAL: "interval",
  STALE_LIMIT: "staleLimit",
  LEVEL: "level",
  INCLUDES: "includes",
  EXCLUDES: "excludes",
  FALLBACK: "fallback",
  MATCHES: "matches"
};
const handleClientStateChange = () => {
};
const mapStateOnServer = (reduceProps) => {
  const defaultProps = {
    interval: 10,
    staleLimit: false,
    level: 0,
    includes: null,
    excludes: null,
    fallback: false,
    matches: null
  };
  return Object.keys(defaultProps).reduce((props, key) => {
    const propKey = key;
    const reduceProp = reduceProps[propKey];
    let nextProps = props;
    if ((0, import_util.exist)(reduceProp)) {
      nextProps = {
        ...props,
        [propKey]: reduceProp
      };
    }
    return nextProps;
  }, defaultProps);
};
const reducePropsToState = (propsList) => {
  const reduceProps = {
    interval: (0, import_util.getOutermostProperty)(propsList, PROP_NAMES.INTERVAL),
    staleLimit: (0, import_util.getOutermostProperty)(propsList, PROP_NAMES.STALE_LIMIT),
    level: (0, import_util.getOutermostProperty)(propsList, PROP_NAMES.LEVEL),
    includes: (0, import_util.aggKeysFromPropsList)(propsList, PROP_NAMES.INCLUDES),
    excludes: (0, import_util.aggKeysFromPropsList)(propsList, PROP_NAMES.EXCLUDES),
    fallback: (0, import_util.getOutermostProperty)(propsList, PROP_NAMES.FALLBACK),
    matches: (0, import_util.aggMatchesFromPropsList)(propsList, PROP_NAMES.MATCHES)
  };
  return reduceProps;
};
function factory(Component) {
  class Spr extends import_react.default.Component {
    static set canUseDOM(canUseDOM) {
      Component.canUseDOM = canUseDOM;
    }
    static get canUseDOM() {
      return Component.canUseDOM;
    }
    verify() {
      return true;
    }
    render() {
      const newProps = {
        ...this.props
      };
      const validate = this.verify();
      if (!validate) {
        throw new Error("invalid props, check usage");
      }
      if (process.env.NODE_ENV === "development") {
        console.error("[Warn] PreRender has been deprecated, please use SSR Cache instead. reference to docs: https://modernjs.dev/guides/advanced-features/ssr.html");
      }
      return (0, import_react.createElement)(Component, {
        ...newProps
      });
    }
  }
  Spr.peek = Component.peek;
  Spr.rewind = Component.rewind;
  Spr.config = () => {
    const mappedState = Component.rewind();
    return mappedState;
  };
  return Spr;
}
const NullComponent = () => null;
const SprSideEffects = (0, import_react_side_effect.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
const PreRender = factory(SprSideEffects);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PreRender
});
