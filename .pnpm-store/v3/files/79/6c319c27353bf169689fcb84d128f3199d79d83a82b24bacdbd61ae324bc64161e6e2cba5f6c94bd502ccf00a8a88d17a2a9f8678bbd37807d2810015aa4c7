"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: () => _default
});
const _store = require("@modern-js-reduck/store");
const _immer = require("immer");
(0, _immer.enableES5)();
(0, _immer.enableMapSet)();
(0, _immer.setAutoFreeze)(false);
const _default = (0, _store.createPlugin)(() => ({
  beforeReducer(reducer) {
    return (state, payload, ...extraArgs) => (0, _immer.produce)(state, (draft) => reducer(draft, payload, ...extraArgs));
  }
}));
