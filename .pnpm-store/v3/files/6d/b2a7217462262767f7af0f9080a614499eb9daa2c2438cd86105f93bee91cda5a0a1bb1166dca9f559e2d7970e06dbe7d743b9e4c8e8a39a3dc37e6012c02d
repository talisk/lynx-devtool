import { _ as _async_iterator } from "@swc/helpers/_/_async_iterator";
import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _await_async_generator } from "@swc/helpers/_/_await_async_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_array } from "@swc/helpers/_/_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _type_of } from "@swc/helpers/_/_type_of";
import { _ as _wrap_async_generator } from "@swc/helpers/_/_wrap_async_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { AbortedDeferredError, UNSAFE_DeferredData as DeferredData } from "@modern-js/runtime-utils/remix-router";
var DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
function parseDeferredReadableStream(stream) {
  return _parseDeferredReadableStream.apply(this, arguments);
}
function _parseDeferredReadableStream() {
  _parseDeferredReadableStream = _async_to_generator(function(stream) {
    var deferredData, deferredResolvers, sectionReader, initialSectionResult, initialSection, criticalData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, error, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, resolver;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          if (!stream) {
            throw new Error("parseDeferredReadableStream requires stream argument");
          }
          deferredResolvers = {};
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            3,
            ,
            4
          ]);
          sectionReader = readStreamSections(stream);
          return [
            4,
            sectionReader.next()
          ];
        case 2:
          initialSectionResult = _state.sent();
          initialSection = initialSectionResult.value;
          if (!initialSection) {
            throw new Error("no critical data");
          }
          criticalData = JSON.parse(initialSection);
          if ((typeof criticalData === "undefined" ? "undefined" : _type_of(criticalData)) === "object" && criticalData !== null) {
            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
            try {
              _loop = function() {
                var _step_value = _sliced_to_array(_step.value, 2), eventKey = _step_value[0], value = _step_value[1];
                if (typeof value !== "string" || !value.startsWith(DEFERRED_VALUE_PLACEHOLDER_PREFIX)) {
                  return "continue";
                }
                deferredData = deferredData || {};
                deferredData[eventKey] = new Promise(function(resolve, reject) {
                  deferredResolvers[eventKey] = {
                    resolve: function(value2) {
                      resolve(value2);
                      delete deferredResolvers[eventKey];
                    },
                    reject: function(error2) {
                      reject(error2);
                      delete deferredResolvers[eventKey];
                    }
                  };
                });
              };
              for (_iterator = Object.entries(criticalData)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)
                _loop();
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
          }
          _async_to_generator(function() {
            var _iteratorAbruptCompletion, _didIteratorError2, _iteratorError2, _iterator2, _step2, _value, section, _section_split, event, sectionDataStrings, sectionDataString, data, _iteratorNormalCompletion2, _didIteratorError12, _iteratorError12, _iterator12, _step12, _step_value, key, value, _iteratorNormalCompletion12, _didIteratorError22, _iteratorError22, _iterator22, _step22, _step_value1, key1, value1, _$err, err1, _iteratorNormalCompletion22, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step_value2, key2, resolver2, error2, _iteratorNormalCompletion3, _didIteratorError4, _iteratorError4, _iterator4, _step4, resolver1;
            return _ts_generator(this, function(_state2) {
              switch (_state2.label) {
                case 0:
                  _state2.trys.push([
                    0,
                    13,
                    ,
                    14
                  ]);
                  _iteratorAbruptCompletion = false, _didIteratorError2 = false;
                  _state2.label = 1;
                case 1:
                  _state2.trys.push([
                    1,
                    6,
                    7,
                    12
                  ]);
                  _iterator2 = _async_iterator(sectionReader);
                  _state2.label = 2;
                case 2:
                  return [
                    4,
                    _iterator2.next()
                  ];
                case 3:
                  if (!(_iteratorAbruptCompletion = !(_step2 = _state2.sent()).done))
                    return [
                      3,
                      5
                    ];
                  _value = _step2.value;
                  section = _value;
                  _section_split = _to_array(section.split(":")), event = _section_split[0], sectionDataStrings = _section_split.slice(1);
                  sectionDataString = sectionDataStrings.join(":");
                  data = JSON.parse(sectionDataString);
                  if (event === "data") {
                    _iteratorNormalCompletion2 = true, _didIteratorError12 = false, _iteratorError12 = void 0;
                    try {
                      for (_iterator12 = Object.entries(data)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion2 = true) {
                        _step_value = _sliced_to_array(_step12.value, 2), key = _step_value[0], value = _step_value[1];
                        if (deferredResolvers[key]) {
                          deferredResolvers[key].resolve(value);
                        }
                      }
                    } catch (err) {
                      _didIteratorError12 = true;
                      _iteratorError12 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator12.return != null) {
                          _iterator12.return();
                        }
                      } finally {
                        if (_didIteratorError12) {
                          throw _iteratorError12;
                        }
                      }
                    }
                  } else if (event === "error") {
                    _iteratorNormalCompletion12 = true, _didIteratorError22 = false, _iteratorError22 = void 0;
                    try {
                      for (_iterator22 = Object.entries(data)[Symbol.iterator](); !(_iteratorNormalCompletion12 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion12 = true) {
                        _step_value1 = _sliced_to_array(_step22.value, 2), key1 = _step_value1[0], value1 = _step_value1[1];
                        _$err = new Error(value1.message);
                        _$err.stack = value1.stack;
                        if (deferredResolvers[key1]) {
                          deferredResolvers[key1].reject(_$err);
                        }
                      }
                    } catch (err) {
                      _didIteratorError22 = true;
                      _iteratorError22 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion12 && _iterator22.return != null) {
                          _iterator22.return();
                        }
                      } finally {
                        if (_didIteratorError22) {
                          throw _iteratorError22;
                        }
                      }
                    }
                  }
                  _state2.label = 4;
                case 4:
                  _iteratorAbruptCompletion = false;
                  return [
                    3,
                    2
                  ];
                case 5:
                  return [
                    3,
                    12
                  ];
                case 6:
                  err1 = _state2.sent();
                  _didIteratorError2 = true;
                  _iteratorError2 = err1;
                  return [
                    3,
                    12
                  ];
                case 7:
                  _state2.trys.push([
                    7,
                    ,
                    10,
                    11
                  ]);
                  if (!(_iteratorAbruptCompletion && _iterator2.return != null))
                    return [
                      3,
                      9
                    ];
                  return [
                    4,
                    _iterator2.return()
                  ];
                case 8:
                  _state2.sent();
                  _state2.label = 9;
                case 9:
                  return [
                    3,
                    11
                  ];
                case 10:
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                  return [
                    7
                  ];
                case 11:
                  return [
                    7
                  ];
                case 12:
                  _iteratorNormalCompletion22 = true, _didIteratorError3 = false, _iteratorError3 = void 0;
                  try {
                    for (_iterator3 = Object.entries(deferredResolvers)[Symbol.iterator](); !(_iteratorNormalCompletion22 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion22 = true) {
                      _step_value2 = _sliced_to_array(_step3.value, 2), key2 = _step_value2[0], resolver2 = _step_value2[1];
                      resolver2.reject(new AbortedDeferredError("Deferred ".concat(key2, " will never resolved")));
                    }
                  } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion22 && _iterator3.return != null) {
                        _iterator3.return();
                      }
                    } finally {
                      if (_didIteratorError3) {
                        throw _iteratorError3;
                      }
                    }
                  }
                  return [
                    3,
                    14
                  ];
                case 13:
                  error2 = _state2.sent();
                  _iteratorNormalCompletion3 = true, _didIteratorError4 = false, _iteratorError4 = void 0;
                  try {
                    for (_iterator4 = Object.values(deferredResolvers)[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion3 = true) {
                      resolver1 = _step4.value;
                      resolver1.reject(error2);
                    }
                  } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion3 && _iterator4.return != null) {
                        _iterator4.return();
                      }
                    } finally {
                      if (_didIteratorError4) {
                        throw _iteratorError4;
                      }
                    }
                  }
                  return [
                    3,
                    14
                  ];
                case 14:
                  return [
                    2
                  ];
              }
            });
          })();
          return [
            2,
            new DeferredData(_object_spread({}, criticalData, deferredData))
          ];
        case 3:
          error = _state.sent();
          _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
          try {
            for (_iterator1 = Object.values(deferredResolvers)[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
              resolver = _step1.value;
              resolver.reject(error);
            }
          } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
              }
            } finally {
              if (_didIteratorError1) {
                throw _iteratorError1;
              }
            }
          }
          throw error;
        case 4:
          return [
            2
          ];
      }
    });
  });
  return _parseDeferredReadableStream.apply(this, arguments);
}
function readStreamSections(stream) {
  return _readStreamSections.apply(this, arguments);
}
function _readStreamSections() {
  _readStreamSections = _wrap_async_generator(function(stream) {
    var reader, buffer, sections, closed, encoder, decoder, readStreamSection, section;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          reader = stream.getReader();
          buffer = [];
          sections = [];
          closed = false;
          encoder = new TextEncoder();
          decoder = new TextDecoder();
          readStreamSection = function() {
            var _ref = _async_to_generator(function() {
              var chunk, bufferedString, splitSections, _sections, bufferedString1;
              return _ts_generator(this, function(_state2) {
                switch (_state2.label) {
                  case 0:
                    if (sections.length > 0) {
                      return [
                        2,
                        sections.shift()
                      ];
                    }
                    _state2.label = 1;
                  case 1:
                    if (!(!closed && sections.length === 0))
                      return [
                        3,
                        3
                      ];
                    return [
                      4,
                      reader.read()
                    ];
                  case 2:
                    chunk = _state2.sent();
                    if (chunk.done) {
                      closed = true;
                      return [
                        3,
                        3
                      ];
                    }
                    buffer.push(chunk.value);
                    try {
                      bufferedString = decoder.decode(mergeArrays.apply(void 0, _to_consumable_array(buffer)));
                      splitSections = bufferedString.split("\n\n");
                      if (splitSections.length >= 2) {
                        ;
                        (_sections = sections).push.apply(_sections, _to_consumable_array(splitSections.slice(0, -1)));
                        buffer = [
                          encoder.encode(splitSections.slice(-1).join("\n\n"))
                        ];
                      }
                      if (sections.length > 0) {
                        return [
                          3,
                          3
                        ];
                      }
                    } catch (e) {
                      return [
                        3,
                        1
                      ];
                    }
                    return [
                      3,
                      1
                    ];
                  case 3:
                    if (sections.length > 0) {
                      return [
                        2,
                        sections.shift()
                      ];
                    }
                    if (buffer.length > 0) {
                      bufferedString1 = decoder.decode(mergeArrays.apply(void 0, _to_consumable_array(buffer)));
                      sections = bufferedString1.split("\n\n").filter(function(s) {
                        return s;
                      });
                      buffer = [];
                    }
                    return [
                      2,
                      sections.shift()
                    ];
                }
              });
            });
            return function readStreamSection2() {
              return _ref.apply(this, arguments);
            };
          }();
          return [
            4,
            _await_async_generator(readStreamSection())
          ];
        case 1:
          section = _state.sent();
          _state.label = 2;
        case 2:
          if (!section)
            return [
              3,
              5
            ];
          return [
            4,
            section
          ];
        case 3:
          _state.sent();
          return [
            4,
            _await_async_generator(readStreamSection())
          ];
        case 4:
          section = _state.sent();
          return [
            3,
            2
          ];
        case 5:
          return [
            2
          ];
      }
    });
  });
  return _readStreamSections.apply(this, arguments);
}
function mergeArrays() {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }
  var out = new Uint8Array(arrays.reduce(function(total, arr2) {
    return total + arr2.length;
  }, 0));
  var offset = 0;
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = arrays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arr = _step.value;
      out.set(arr, offset);
      offset += arr.length;
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
  return out;
}
export {
  parseDeferredReadableStream
};
