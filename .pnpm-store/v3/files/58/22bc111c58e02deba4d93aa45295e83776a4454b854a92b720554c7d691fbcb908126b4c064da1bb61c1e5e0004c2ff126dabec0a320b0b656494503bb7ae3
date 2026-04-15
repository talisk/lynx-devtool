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
var time_exports = {};
__export(time_exports, {
  time: () => time
});
module.exports = __toCommonJS(time_exports);
function processHrtime(previousTimestamp) {
  const now = (/* @__PURE__ */ new Date()).getTime();
  const clocktime = now * 1e-3;
  let seconds = Math.floor(clocktime);
  let nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds -= previousTimestamp[0];
    nanoseconds -= previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [
    seconds,
    nanoseconds
  ];
}
const getLatency = (hrtime) => {
  const [s, ns] = processHrtime(hrtime);
  return s * 1e3 + ns / 1e6;
};
const time = () => {
  const hrtime = processHrtime();
  return () => {
    return getLatency(hrtime);
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  time
});
