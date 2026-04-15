const REQUEST_META = [
  "header",
  "query"
];
const getInnermostProperty = function getInnermostProperty2(propsList, propName) {
  for (let i = propsList.length - 1; i >= 0; i--) {
    const props = propsList[i];
    if (props.hasOwnProperty(propName)) {
      return props[propName];
    }
  }
  return null;
};
const getOutermostProperty = function getOutermostProperty2(propsList, propName) {
  for (const props of propsList) {
    if (props.hasOwnProperty(propName)) {
      return props[propName];
    }
  }
  return null;
};
const aggKeysFromPropsList = function aggKeysFromPropsList2(propsList, propName) {
  const initResult = REQUEST_META.reduce((result, next) => {
    const key = next;
    result[key] = [];
    return result;
  }, {});
  const res = propsList.filter((props) => usefulObject(props[propName])).reduce((result, next) => {
    REQUEST_META.forEach((key) => {
      const prop = next[propName];
      if ((prop === null || prop === void 0 ? void 0 : prop.hasOwnProperty(key)) && usefulArray(prop[key])) {
        result[key] = unique(result[key].concat(prop[key]));
      }
    });
    return result;
  }, initResult);
  return REQUEST_META.reduce((result, next) => {
    var _result_key;
    const key = next;
    if (result[key] && ((_result_key = result[key]) === null || _result_key === void 0 ? void 0 : _result_key.length) === 0) {
      delete result[key];
    }
    return result;
  }, res);
};
const aggMatchesFromPropsList = function aggMatchesFromPropsList2(propsList, propName) {
  const initResult = REQUEST_META.reduce((result, next) => {
    const key = next;
    result[key] = {};
    return result;
  }, {});
  const res = propsList.filter((props) => usefulObject(props[propName])).reduce((result, next) => {
    REQUEST_META.forEach((key) => {
      const prop = next[propName];
      if ((prop === null || prop === void 0 ? void 0 : prop.hasOwnProperty(key)) && usefulObject(prop[key])) {
        result[key] = Object.assign(result[key], prop[key]);
      }
    });
    return result;
  }, initResult);
  return REQUEST_META.reduce((result, next) => {
    const key = next;
    if (result[key] && Object.keys(result[key]).length === 0) {
      delete result[key];
    }
    return result;
  }, res);
};
function unique(arr) {
  return Array.from(new Set(arr));
}
function usefulObject(target) {
  if (!exist(target)) {
    return false;
  }
  return target.constructor === Object && Object.keys(target).length > 0;
}
function usefulArray(target) {
  if (!exist(target)) {
    return false;
  }
  return Array.isArray(target) && target.length > 0;
}
function exist(target) {
  return target != null;
}
export {
  aggKeysFromPropsList,
  aggMatchesFromPropsList,
  exist,
  getInnermostProperty,
  getOutermostProperty
};
