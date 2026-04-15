import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _type_of } from "@swc/helpers/_/_type_of";
function isObject(obj) {
  return obj && (typeof obj === "undefined" ? "undefined" : _type_of(obj)) === "object" && !Array.isArray(obj);
}
function merge(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  if (!sources.length) {
    return target;
  }
  var source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, _define_property({}, key, {}));
        }
        merge(target[key], source[key]);
      } else {
        Object.assign(target, _define_property({}, key, source[key]));
      }
    }
  }
  return merge.apply(void 0, [
    target
  ].concat(_to_consumable_array(sources)));
}
export {
  merge
};
