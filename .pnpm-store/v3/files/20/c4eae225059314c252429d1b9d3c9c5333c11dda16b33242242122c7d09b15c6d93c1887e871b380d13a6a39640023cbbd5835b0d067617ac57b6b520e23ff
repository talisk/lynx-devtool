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
  push: () => push,
  pop: () => pop,
  shift: () => shift,
  unshift: () => unshift,
  concat: () => concat,
  splice: () => splice,
  filter: () => filter
});
const push = (state, payload) => state.concat(payload);
const pop = (state) => {
  const newState = [];
  for (let i = 0; i < state.length - 1; i++) {
    newState.push(state[i]);
  }
  return newState;
};
const shift = (state) => {
  const newState = [];
  for (let i = 1; i < state.length; i++) {
    newState.push(state[i]);
  }
  return newState;
};
const unshift = (state, payload) => [
  payload,
  ...state
];
const concat = (state, payload) => [
  ...state,
  ...payload
];
const splice = (state, start, deleteCount, ...items) => {
  const newState = state.slice();
  newState.splice(start, deleteCount, ...items);
  return newState;
};
const filter = (state, filterFn) => {
  const newState = state.filter(filterFn);
  return newState;
};
