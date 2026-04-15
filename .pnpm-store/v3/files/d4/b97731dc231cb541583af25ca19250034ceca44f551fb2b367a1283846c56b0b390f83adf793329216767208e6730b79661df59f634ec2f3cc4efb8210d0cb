import { isObject, isString } from "@modern-js/utils/lodash";
function getObjKeyMap(obj, prefix = "") {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (isString(obj[key])) {
      result[key] = prefix ? `${prefix}.${key}` : key;
    } else if (isObject(obj[key])) {
      result[key] = getObjKeyMap(obj[key], prefix ? `${prefix}.${key}` : key);
    }
  });
  return result;
}
export {
  getObjKeyMap
};
