"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: () => _default
});
const _store = require("@modern-js-reduck/store");
const _extension = require("@redux-devtools/extension");
const _default = (config) => (0, _store.createPlugin)(() => ({
  config: (storeConfig) => {
    const { enhancers = [] } = storeConfig;
    storeConfig.enhancers = [
      (0, _extension.devToolsEnhancer)(config),
      ...enhancers
    ];
    return storeConfig;
  }
}));
