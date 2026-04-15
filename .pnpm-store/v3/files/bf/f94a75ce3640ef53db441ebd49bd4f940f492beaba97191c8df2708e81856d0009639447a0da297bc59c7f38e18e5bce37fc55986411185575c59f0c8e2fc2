"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var util_exports = {};
__export(util_exports, {
  aggKeysFromPropsList: () => aggKeysFromPropsList,
  aggMatchesFromPropsList: () => aggMatchesFromPropsList,
  exist: () => exist,
  getInnermostProperty: () => getInnermostProperty,
  getOutermostProperty: () => getOutermostProperty
});
module.exports = __toCommonJS(util_exports);
const REQUEST_META = [
  "header",
  "query"
];
const getInnermostProperty = function getInnermostProperty2(propsList, propName) {
  for (let i = propsList.length - 1; i >= 0; i--) {
    const props = propsList[i];
    if (props.hasOwnProperty(propName)) {
      return props[propName];
    }
  }
  return null;
};
const getOutermostProperty = function getOutermostProperty2(propsList, propName) {
  for (const props of propsList) {
    if (props.hasOwnProperty(propName)) {
      return props[propName];
    }
  }
  return null;
};
const aggKeysFromPropsList = function aggKeysFromPropsList2(propsList, propName) {
  const initResult = REQUEST_META.reduce((result, next) => {
    const key = next;
    result[key] = [];
    return result;
  }, {});
  const res = propsList.filter((props) => usefulObject(props[propName])).reduce((result, next) => {
    REQUEST_META.forEach((key) => {
      const prop = next[propName];
      if ((prop === null || prop === void 0 ? void 0 : prop.hasOwnProperty(key)) && usefulArray(prop[key])) {
        result[key] = unique(result[key].concat(prop[key]));
      }
    });
    return result;
  }, initResult);
  return REQUEST_META.reduce((result, next) => {
    var _result_key;
    const key = next;
    if (result[key] && ((_result_key = result[key]) === null || _result_key === void 0 ? void 0 : _result_key.length) === 0) {
      delete result[key];
    }
    return result;
  }, res);
};
const aggMatchesFromPropsList = function aggMatchesFromPropsList2(propsList, propName) {
  const initResult = REQUEST_META.reduce((result, next) => {
    const key = next;
    result[key] = {};
    return result;
  }, {});
  const res = propsList.filter((props) => usefulObject(props[propName])).reduce((result, next) => {
    REQUEST_META.forEach((key) => {
      const prop = next[propName];
      if ((prop === null || prop === void 0 ? void 0 : prop.hasOwnProperty(key)) && usefulObject(prop[key])) {
        result[key] = Object.assign(result[key], prop[key]);
      }
    });
    return result;
  }, initResult);
  return REQUEST_META.reduce((result, next) => {
    const key = next;
    if (result[key] && Object.keys(result[key]).length === 0) {
      delete result[key];
    }
    return result;
  }, res);
};
function unique(arr) {
  return Array.from(new Set(arr));
}
function usefulObject(target) {
  if (!exist(target)) {
    return false;
  }
  return target.constructor === Object && Object.keys(target).length > 0;
}
function usefulArray(target) {
  if (!exist(target)) {
    return false;
  }
  return Array.isArray(target) && target.length > 0;
}
function exist(target) {
  return target != null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aggKeysFromPropsList,
  aggMatchesFromPropsList,
  exist,
  getInnermostProperty,
  getOutermostProperty
});
