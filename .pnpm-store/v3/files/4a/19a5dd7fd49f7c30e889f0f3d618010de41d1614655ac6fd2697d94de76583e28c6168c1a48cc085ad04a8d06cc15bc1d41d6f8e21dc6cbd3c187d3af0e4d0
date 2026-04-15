"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createObjectActions", {
  enumerable: true,
  get: () => createObjectActions
});
const createObjectActions = (state) => {
  const result = {};
  Object.keys(state).forEach((key) => {
    result[`set${key[0].toUpperCase()}${key.substring(1)}`] = (_state, payload) => ({
      ..._state,
      [key]: payload
    });
  });
  return result;
};
