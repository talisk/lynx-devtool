"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
function _export(target, all) {
  for (var name in all)
    Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name]
    });
}
_export(exports, {
  canUseDOM: () => canUseDOM,
  useIsomorphicLayoutEffect: () => useIsomorphicLayoutEffect
});
const _react = require("react");
const canUseDOM = Boolean(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const useIsomorphicLayoutEffect = canUseDOM ? _react.useLayoutEffect : _react.useEffect;
