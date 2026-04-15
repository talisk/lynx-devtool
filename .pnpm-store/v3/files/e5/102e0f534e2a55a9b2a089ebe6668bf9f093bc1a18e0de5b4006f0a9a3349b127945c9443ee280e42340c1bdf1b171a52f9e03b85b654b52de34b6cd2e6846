import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
const createObjectActions = (state) => {
  const result = {};
  Object.keys(state).forEach((key) => {
    result[`set${key[0].toUpperCase()}${key.substring(1)}`] = (_state, payload) => _object_spread_props(_object_spread({}, _state), {
      [key]: payload
    });
  });
  return result;
};
export { createObjectActions };
