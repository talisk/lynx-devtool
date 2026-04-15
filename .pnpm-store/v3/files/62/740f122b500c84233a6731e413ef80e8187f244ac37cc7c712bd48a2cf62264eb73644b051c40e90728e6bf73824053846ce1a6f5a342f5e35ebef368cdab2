import { isObject, isString } from "@modern-js/utils/lodash";
function getObjKeyMap(obj) {
  var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var result = {};
  Object.keys(obj).forEach(function(key) {
    if (isString(obj[key])) {
      result[key] = prefix ? "".concat(prefix, ".").concat(key) : key;
    } else if (isObject(obj[key])) {
      result[key] = getObjKeyMap(obj[key], prefix ? "".concat(prefix, ".").concat(key) : key);
    }
  });
  return result;
}
export {
  getObjKeyMap
};
