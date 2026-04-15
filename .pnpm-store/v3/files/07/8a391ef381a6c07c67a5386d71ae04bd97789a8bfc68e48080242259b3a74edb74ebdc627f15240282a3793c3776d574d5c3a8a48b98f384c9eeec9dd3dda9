var REQUEST_META = [
  "header",
  "query"
];
var getInnermostProperty = function getInnermostProperty2(propsList, propName) {
  for (var i = propsList.length - 1; i >= 0; i--) {
    var props = propsList[i];
    if (props.hasOwnProperty(propName)) {
      return props[propName];
    }
  }
  return null;
};
var getOutermostProperty = function getOutermostProperty2(propsList, propName) {
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = propsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var props = _step.value;
      if (props.hasOwnProperty(propName)) {
        return props[propName];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return null;
};
var aggKeysFromPropsList = function aggKeysFromPropsList2(propsList, propName) {
  var initResult = REQUEST_META.reduce(function(result, next) {
    var key = next;
    result[key] = [];
    return result;
  }, {});
  var res = propsList.filter(function(props) {
    return usefulObject(props[propName]);
  }).reduce(function(result, next) {
    REQUEST_META.forEach(function(key) {
      var prop = next[propName];
      if ((prop === null || prop === void 0 ? void 0 : prop.hasOwnProperty(key)) && usefulArray(prop[key])) {
        result[key] = unique(result[key].concat(prop[key]));
      }
    });
    return result;
  }, initResult);
  return REQUEST_META.reduce(function(result, next) {
    var _result_key;
    var key = next;
    if (result[key] && ((_result_key = result[key]) === null || _result_key === void 0 ? void 0 : _result_key.length) === 0) {
      delete result[key];
    }
    return result;
  }, res);
};
var aggMatchesFromPropsList = function aggMatchesFromPropsList2(propsList, propName) {
  var initResult = REQUEST_META.reduce(function(result, next) {
    var key = next;
    result[key] = {};
    return result;
  }, {});
  var res = propsList.filter(function(props) {
    return usefulObject(props[propName]);
  }).reduce(function(result, next) {
    REQUEST_META.forEach(function(key) {
      var prop = next[propName];
      if ((prop === null || prop === void 0 ? void 0 : prop.hasOwnProperty(key)) && usefulObject(prop[key])) {
        result[key] = Object.assign(result[key], prop[key]);
      }
    });
    return result;
  }, initResult);
  return REQUEST_META.reduce(function(result, next) {
    var key = next;
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
