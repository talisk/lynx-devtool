// src/farrow-pipeline/index.ts
import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";

// src/farrow-pipeline/context.ts
var createContext = function(value) {
  var currentValue = value;
  return {
    use: function() {
      return {
        get value() {
          return currentValue;
        },
        set value(v) {
          currentValue = v;
        }
      };
    },
    get: function() {
      return currentValue;
    },
    set: function(v1) {
      currentValue = v1;
    }
  };
};

// src/farrow-pipeline/counter.ts
var createCounter = function(callback) {
  var dispatch = function(index, input) {
    var next = function() {
      var nextInput = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : input;
      return dispatch(index + 1, nextInput);
    };
    return callback(index, input, next);
  };
  return {
    start: function(input) {
      return dispatch(0, input);
    },
    dispatch
  };
};

// src/farrow-pipeline/index.ts
var isPipeline = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[PipelineSymbol]);
};
var PipelineSymbol = Symbol.for("MODERN_PIPELINE");
var getMiddleware = function(input) {
  if (typeof input === "function") {
    return input;
  } else if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error("".concat(input, " is not a Middleware"));
};
var createPipeline = function() {
  var middlewares = [];
  var use = function() {
    for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
      inputs[_key] = arguments[_key];
    }
    var _middlewares;
    (_middlewares = middlewares).push.apply(_middlewares, _to_consumable_array(inputs.map(getMiddleware)));
    return pipeline;
  };
  var createCurrentCounter = function(onLast) {
    return createCounter(function(index, input, next) {
      if (index >= middlewares.length) {
        if (onLast) {
          return onLast(input);
        }
        throw new Error("Expect returning a value, but all middlewares just calling next()");
      }
      return middlewares[index](input, next);
    });
  };
  var currentCounter = createCurrentCounter();
  var getCounter = function(options) {
    if (!options) {
      return currentCounter;
    }
    return createCurrentCounter(options === null || options === void 0 ? void 0 : options.onLast);
  };
  var run = function(input, options) {
    return getCounter(options).start(input);
  };
  var middleware = function(input, next) {
    return run(input, {
      onLast: next
    });
  };
  var _obj;
  var pipeline = (_obj = {}, _define_property(_obj, PipelineSymbol, true), _define_property(_obj, "use", use), _define_property(_obj, "run", run), _define_property(_obj, "middleware", middleware), _obj);
  return pipeline;
};
var createAsyncPipeline = function() {
  var pipeline = createPipeline();
  return _object_spread({}, pipeline);
};

// src/waterfall/sync.ts
import { _ as _define_property2 } from "@swc/helpers/_/_define_property";
import { _ as _object_spread2 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array2 } from "@swc/helpers/_/_to_consumable_array";
var WATERFALL_SYMBOL = Symbol.for("MODERN_WATERFALL");
var getBrook = function(input) {
  if (typeof input === "function") {
    return input;
  } else if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error("".concat(input, " is not a Brook or { brook: Brook }"));
};
var createWaterfall = function() {
  var pipeline = createPipeline();
  var use = function() {
    for (var _len = arguments.length, brooks = new Array(_len), _key = 0; _key < _len; _key++) {
      brooks[_key] = arguments[_key];
    }
    var _pipeline;
    (_pipeline = pipeline).use.apply(_pipeline, _to_consumable_array2(brooks.map(getBrook).map(mapBrookToMiddleware)));
    return waterfall;
  };
  var run = function(input, options) {
    return pipeline.run(input, _object_spread_props(_object_spread2({}, options), {
      onLast: function(input2) {
        return input2;
      }
    }));
  };
  var middleware = function(input) {
    return pipeline.run(input, {
      onLast: function(input2) {
        return input2;
      }
    });
  };
  var waterfall = _object_spread_props(_object_spread2({}, pipeline), _define_property2({
    use,
    run,
    middleware
  }, WATERFALL_SYMBOL, true));
  return waterfall;
};
var isWaterfall = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[WATERFALL_SYMBOL]);
};
var mapBrookToMiddleware = function(brook) {
  return function(input, next) {
    return next(brook(input));
  };
};

// src/waterfall/async.ts
import { _ as _define_property3 } from "@swc/helpers/_/_define_property";
import { _ as _object_spread3 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props2 } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array3 } from "@swc/helpers/_/_to_consumable_array";
var ASYNC_WATERFALL_SYMBOL = Symbol.for("MODERN_ASYNC_WATERFALL");
var getAsyncBrook = function(input) {
  if (typeof input === "function") {
    return input;
  }
  if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error("".concat(input, " is not a AsyncBrook or { brook: AsyncBrook }"));
};
var createAsyncWaterfall = function() {
  var pipeline = createAsyncPipeline();
  var use = function() {
    for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
      input[_key] = arguments[_key];
    }
    var _pipeline;
    (_pipeline = pipeline).use.apply(_pipeline, _to_consumable_array3(input.map(getAsyncBrook).map(mapAsyncBrookToAsyncMiddleware)));
    return waterfall;
  };
  var run = function(input, options) {
    return pipeline.run(input, _object_spread_props2(_object_spread3({}, options), {
      onLast: function(input2) {
        return input2;
      }
    }));
  };
  var middleware = function(input) {
    return pipeline.run(input, {
      onLast: function(input2) {
        return input2;
      }
    });
  };
  var waterfall = _object_spread_props2(_object_spread3({}, pipeline), _define_property3({
    use,
    run,
    middleware
  }, ASYNC_WATERFALL_SYMBOL, true));
  return waterfall;
};
var isAsyncWaterfall = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_WATERFALL_SYMBOL]);
};
var mapAsyncBrookToAsyncMiddleware = function(brook) {
  return function(input, next) {
    return Promise.resolve(brook(input)).then(function(result) {
      return next(result);
    });
  };
};

// src/workflow/sync.ts
import { _ as _define_property4 } from "@swc/helpers/_/_define_property";
import { _ as _object_spread4 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props3 } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array4 } from "@swc/helpers/_/_to_consumable_array";
var WORKFLOW_SYMBOL = Symbol.for("MODERN_WORKFLOW");
var createWorkflow = function() {
  var pipeline = createPipeline();
  var use = function() {
    for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
      input[_key] = arguments[_key];
    }
    var _pipeline;
    (_pipeline = pipeline).use.apply(_pipeline, _to_consumable_array4(input.map(mapWorkerToMiddleware)));
    return workflow;
  };
  var run = function(input) {
    var result = pipeline.run(input, {
      onLast: function() {
        return [];
      }
    });
    return result.filter(Boolean);
  };
  var workflow = _object_spread_props3(_object_spread4({}, pipeline), _define_property4({
    use,
    run
  }, WORKFLOW_SYMBOL, true));
  return workflow;
};
var isWorkflow = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[WORKFLOW_SYMBOL]);
};
var mapWorkerToMiddleware = function(worker) {
  return function(input, next) {
    return [
      worker(input)
    ].concat(_to_consumable_array4(next(input)));
  };
};

// src/workflow/syncParallel.ts
import { _ as _define_property5 } from "@swc/helpers/_/_define_property";
import { _ as _object_spread5 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props4 } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array5 } from "@swc/helpers/_/_to_consumable_array";
var SYNC_PARALLEL_WORKFLOW_SYMBOL = Symbol.for("SYNC_MODERN_PARALLEL_WORKFLOW");
var isSyncParallelWorkflow = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[SYNC_PARALLEL_WORKFLOW_SYMBOL]);
};
var createSyncParallelWorkflow = function() {
  var pipeline = createPipeline();
  var use = function() {
    for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
      input[_key] = arguments[_key];
    }
    var _pipeline;
    (_pipeline = pipeline).use.apply(_pipeline, _to_consumable_array5(input.map(mapSyncParallelWorkerToMiddleware)));
    return workflow;
  };
  var run = function(input) {
    return pipeline.run(input, {
      onLast: function() {
        return [];
      }
    }).filter(function(result) {
      return Boolean(result);
    });
  };
  var workflow = _object_spread_props4(_object_spread5({}, pipeline), _define_property5({
    run,
    use
  }, SYNC_PARALLEL_WORKFLOW_SYMBOL, true));
  return workflow;
};
var mapSyncParallelWorkerToMiddleware = function(worker) {
  return function(input, next) {
    return [
      worker(input)
    ].concat(_to_consumable_array5(next(input)));
  };
};

// src/workflow/parallel.ts
import { _ as _define_property6 } from "@swc/helpers/_/_define_property";
import { _ as _object_spread6 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props5 } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array6 } from "@swc/helpers/_/_to_consumable_array";
var PARALLEL_WORKFLOW_SYMBOL = Symbol.for("MODERN_PARALLEL_WORKFLOW");
var isParallelWorkflow = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[PARALLEL_WORKFLOW_SYMBOL]);
};
var createParallelWorkflow = function() {
  var pipeline = createPipeline();
  var use = function() {
    for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
      input[_key] = arguments[_key];
    }
    var _pipeline;
    (_pipeline = pipeline).use.apply(_pipeline, _to_consumable_array6(input.map(mapParallelWorkerToAsyncMiddleware)));
    return workflow;
  };
  var run = function(input) {
    return Promise.all(pipeline.run(input, {
      onLast: function() {
        return [];
      }
    })).then(function(result) {
      return result.filter(Boolean);
    });
  };
  var workflow = _object_spread_props5(_object_spread6({}, pipeline), _define_property6({
    run,
    use
  }, PARALLEL_WORKFLOW_SYMBOL, true));
  return workflow;
};
var mapParallelWorkerToAsyncMiddleware = function(worker) {
  return function(input, next) {
    return [
      worker(input)
    ].concat(_to_consumable_array6(next(input)));
  };
};

// src/workflow/async.ts
import { _ as _define_property7 } from "@swc/helpers/_/_define_property";
import { _ as _object_spread7 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props6 } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array7 } from "@swc/helpers/_/_to_consumable_array";
var ASYNC_WORKFLOW_SYMBOL = Symbol.for("MODERN_ASYNC_WORKFLOW");
var isPromise = function(obj) {
  return obj && typeof obj.then === "function";
};
var isAsyncWorkflow = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_WORKFLOW_SYMBOL]);
};
var createAsyncWorkflow = function() {
  var pipeline = createAsyncPipeline();
  var use = function() {
    for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
      input[_key] = arguments[_key];
    }
    var _pipeline;
    (_pipeline = pipeline).use.apply(_pipeline, _to_consumable_array7(input.map(mapAsyncWorkerToAsyncMiddleware)));
    return workflow;
  };
  var run = function(input) {
    var result = pipeline.run(input, {
      onLast: function() {
        return [];
      }
    });
    if (isPromise(result)) {
      return result.then(function(result2) {
        return result2.filter(Boolean);
      });
    }
    return result.filter(Boolean);
  };
  var workflow = _object_spread_props6(_object_spread7({}, pipeline), _define_property7({
    use,
    run
  }, ASYNC_WORKFLOW_SYMBOL, true));
  return workflow;
};
var mapAsyncWorkerToAsyncMiddleware = function(worker) {
  return function(input, next) {
    return Promise.resolve(worker(input)).then(function(result) {
      return Promise.resolve(next(input)).then(function(nextResult) {
        return [
          result
        ].concat(_to_consumable_array7(nextResult));
      });
    });
  };
};

// src/workflow/interrupt.ts
import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _define_property8 } from "@swc/helpers/_/_define_property";
import { _ as _object_spread8 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props7 } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array8 } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
var ASYNC_INTERRUPT_WORKFLOW_SYMBOL = Symbol.for("ASYNC_INTERRUPT_WORKFLOW_SYMBOL");
var isAsyncInterruptWorkflow = function(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_INTERRUPT_WORKFLOW_SYMBOL]);
};
var createAsyncInterruptWorkflow = function() {
  var pipeline = createAsyncPipeline();
  var use = function() {
    for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
      input[_key] = arguments[_key];
    }
    var _pipeline;
    (_pipeline = pipeline).use.apply(_pipeline, _to_consumable_array8(input.map(mapAsyncWorkerToInterruptMiddleware)));
    return workflow;
  };
  var run = function() {
    var _ref = _async_to_generator(function(input) {
      var result;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            return [
              4,
              pipeline.run(input, {
                onLast: function() {
                  return [];
                }
              })
            ];
          case 1:
            result = _state.sent();
            return [
              2,
              result
            ];
        }
      });
    });
    return function run2(input) {
      return _ref.apply(this, arguments);
    };
  }();
  var workflow = _object_spread_props7(_object_spread8({}, pipeline), _define_property8({
    use,
    run
  }, ASYNC_INTERRUPT_WORKFLOW_SYMBOL, true));
  return workflow;
};
var mapAsyncWorkerToInterruptMiddleware = function(worker) {
  return function() {
    var _ref = _async_to_generator(function(input, next) {
      var isInterrupted, interrupt, result;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            isInterrupted = false;
            interrupt = function(value) {
              isInterrupted = true;
              return value;
            };
            return [
              4,
              Promise.resolve(worker(input, interrupt))
            ];
          case 1:
            result = _state.sent();
            if (isInterrupted) {
              return [
                2,
                result
              ];
            }
            return [
              2,
              Promise.resolve(next(input))
            ];
        }
      });
    });
    return function(input, next) {
      return _ref.apply(this, arguments);
    };
  }();
};

// src/manager/sync.ts
import { _ as _object_spread9 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props8 } from "@swc/helpers/_/_object_spread_props";

// src/manager/shared.ts
import { _ as _type_of } from "@swc/helpers/_/_type_of";
import { pluginDagSort } from "@modern-js/utils/universal/plugin-dag-sort";
var checkPlugins = function(plugins) {
  if (process.env.NODE_ENV !== "production") {
    plugins.forEach(function(origin) {
      origin.rivals.forEach(function(rival) {
        plugins.forEach(function(plugin) {
          if (rival === plugin.name) {
            throw new Error("".concat(origin.name, " has rival ").concat(plugin.name));
          }
        });
      });
      origin.required.forEach(function(required) {
        if (!plugins.some(function(plugin) {
          return plugin.name === required;
        })) {
          throw new Error("The plugin: ".concat(required, " is required when plugin: ").concat(origin.name, " is exist."));
        }
      });
    });
  }
};
function sortPlugins(input) {
  return pluginDagSort(input.slice());
}
var includePlugin = function(plugins, input) {
  return plugins.some(function(plugin) {
    return plugin.name === input.name;
  });
};
var isObject = function(obj) {
  return obj !== null && (typeof obj === "undefined" ? "undefined" : _type_of(obj)) === "object";
};
var hasOwnProperty = function(obj, prop) {
  return obj.hasOwnProperty(prop);
};

// src/manager/sync.ts
var SYNC_PLUGIN_SYMBOL = "SYNC_PLUGIN_SYMBOL";
var DEFAULT_OPTIONS = {
  name: "untitled",
  pre: [],
  post: [],
  rivals: [],
  required: [],
  usePlugins: [],
  registerHook: {}
};
var createManager = function(hooks, api) {
  var index = 0;
  var runners;
  var currentHooks = _object_spread9({}, hooks);
  var useRunner = function() {
    return runners;
  };
  var registerHook = function(extraHooks) {
    currentHooks = _object_spread9({}, extraHooks, currentHooks);
  };
  var isPlugin = function(input) {
    return isObject(input) && hasOwnProperty(input, SYNC_PLUGIN_SYMBOL) && input[SYNC_PLUGIN_SYMBOL] === SYNC_PLUGIN_SYMBOL;
  };
  var pluginAPI = _object_spread_props8(_object_spread9({}, api), {
    useHookRunners: useRunner
  });
  var clone = function(overrideAPI) {
    var plugins = [];
    var addPlugin = function(plugin) {
      if (!includePlugin(plugins, plugin)) {
        plugins.push(_object_spread9({}, plugin));
      }
    };
    var usePlugin = function() {
      for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
        input[_key] = arguments[_key];
      }
      input.forEach(function(plugin) {
        if (isPlugin(plugin)) {
          addPlugin(plugin);
        } else if (typeof plugin === "function") {
          var options = plugin();
          addPlugin(createPlugin(options.setup, options));
        } else if (isObject(plugin)) {
          addPlugin(createPlugin(plugin.setup, plugin));
        } else if (process.env.NODE_ENV !== "production") {
          console.warn("Unknown plugin: ".concat(JSON.stringify(plugin)));
        }
      });
      return manager;
    };
    var createPlugin = function() {
      var setup = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      }, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _options_usePlugins;
      if ((_options_usePlugins = options.usePlugins) === null || _options_usePlugins === void 0 ? void 0 : _options_usePlugins.length) {
        options.usePlugins.forEach(function(plugin) {
          usePlugin(createPlugin(plugin.setup, plugin));
        });
      }
      if (options.registerHook) {
        registerHook(options.registerHook);
      }
      return _object_spread_props8(_object_spread9(_object_spread_props8(_object_spread9({}, DEFAULT_OPTIONS), {
        name: "No.".concat(index++, " plugin")
      }), options), {
        SYNC_PLUGIN_SYMBOL,
        setup
      });
    };
    var clear = function() {
      plugins = [];
    };
    var init = function() {
      var sortedPlugins = sortPlugins(plugins);
      var mergedPluginAPI = _object_spread9({}, pluginAPI, overrideAPI);
      checkPlugins(sortedPlugins);
      var hooksList = sortedPlugins.map(function(plugin) {
        return plugin.setup(mergedPluginAPI);
      });
      runners = generateRunner(hooksList, currentHooks);
      return runners;
    };
    var run = function(cb) {
      return cb();
    };
    var manager = {
      createPlugin,
      isPlugin,
      usePlugin,
      init,
      clear,
      run,
      registerHook,
      useRunner,
      clone
    };
    return manager;
  };
  return clone();
};
var generateRunner = function(hooksList, hooksMap) {
  var runner = {};
  var cloneShape = cloneHooksMap(hooksMap);
  if (hooksMap) {
    var _loop = function(key2) {
      hooksList.forEach(function(hooks) {
        if (hooks === null || hooks === void 0 ? void 0 : hooks[key2]) {
          cloneShape[key2].use(hooks[key2]);
        }
      });
      runner[key2] = function(input, options) {
        return cloneShape[key2].run(input, _object_spread9({}, options));
      };
    };
    for (var key in cloneShape)
      _loop(key);
  }
  return runner;
};
var cloneHook = function(hook) {
  if (isWaterfall(hook)) {
    return createWaterfall();
  }
  if (isAsyncWaterfall(hook)) {
    return createAsyncWaterfall();
  }
  if (isWorkflow(hook)) {
    return createWorkflow();
  }
  if (isAsyncWorkflow(hook)) {
    return createAsyncWorkflow();
  }
  if (isParallelWorkflow(hook)) {
    return createParallelWorkflow();
  }
  if (isAsyncInterruptWorkflow(hook)) {
    return createAsyncInterruptWorkflow();
  }
  if (isSyncParallelWorkflow(hook)) {
    return createSyncParallelWorkflow();
  }
  if (isPipeline(hook)) {
    return createPipeline();
  }
  throw new Error("Unknown hook: ".concat(hook));
};
var cloneHooksMap = function(record) {
  if (!record) {
    return record;
  }
  var result = {};
  for (var key in record) {
    result[key] = cloneHook(record[key]);
  }
  return result;
};

// src/manager/async.ts
import { _ as _async_to_generator2 } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread10 } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props9 } from "@swc/helpers/_/_object_spread_props";
import { _ as _ts_generator2 } from "@swc/helpers/_/_ts_generator";
var ASYNC_PLUGIN_SYMBOL = "ASYNC_PLUGIN_SYMBOL";
var createAsyncManager = function(hooks, api) {
  var index = 0;
  var runners;
  var currentHooks = _object_spread10({}, hooks);
  var useRunner = function() {
    return runners;
  };
  var registerHook = function(extraHooks) {
    currentHooks = _object_spread10({}, extraHooks, currentHooks);
  };
  var isPlugin = function(input) {
    return isObject(input) && hasOwnProperty(input, ASYNC_PLUGIN_SYMBOL) && input[ASYNC_PLUGIN_SYMBOL] === ASYNC_PLUGIN_SYMBOL;
  };
  var pluginAPI = _object_spread_props9(_object_spread10({}, api), {
    useHookRunners: useRunner
  });
  var clone = function(overrideAPI) {
    var plugins = [];
    var addPlugin = function(plugin) {
      if (!includePlugin(plugins, plugin)) {
        plugins.push(_object_spread10({}, plugin));
      }
    };
    var usePlugin = function() {
      for (var _len = arguments.length, input = new Array(_len), _key = 0; _key < _len; _key++) {
        input[_key] = arguments[_key];
      }
      input.forEach(function(plugin) {
        if (isPlugin(plugin)) {
          addPlugin(plugin);
        } else if (typeof plugin === "function") {
          var options = plugin();
          addPlugin(createPlugin(options.setup, options));
        } else if (isObject(plugin)) {
          addPlugin(createPlugin(plugin.setup, plugin));
        } else if (process.env.NODE_ENV !== "production") {
          console.warn("Unknown plugin: ".concat(JSON.stringify(plugin)));
        }
      });
      return manager;
    };
    var createPlugin = function() {
      var setup = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      }, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _options_usePlugins;
      if ((_options_usePlugins = options.usePlugins) === null || _options_usePlugins === void 0 ? void 0 : _options_usePlugins.length) {
        options.usePlugins.forEach(function(plugin) {
          usePlugin(createPlugin(plugin.setup, plugin));
        });
      }
      if (options.registerHook) {
        registerHook(options.registerHook);
      }
      return _object_spread_props9(_object_spread10(_object_spread_props9(_object_spread10({}, DEFAULT_OPTIONS), {
        name: "No.".concat(index++, " plugin")
      }), options), {
        ASYNC_PLUGIN_SYMBOL,
        setup
      });
    };
    var clear = function() {
      plugins = [];
    };
    var init = function() {
      var _ref = _async_to_generator2(function() {
        var sortedPlugins, mergedPluginAPI, hooksList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, plugin, _, err;
        return _ts_generator2(this, function(_state) {
          switch (_state.label) {
            case 0:
              sortedPlugins = sortPlugins(plugins);
              mergedPluginAPI = _object_spread10({}, pluginAPI, overrideAPI);
              checkPlugins(sortedPlugins);
              hooksList = [];
              _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
              _state.label = 1;
            case 1:
              _state.trys.push([
                1,
                6,
                7,
                8
              ]);
              _iterator = sortedPlugins[Symbol.iterator]();
              _state.label = 2;
            case 2:
              if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done))
                return [
                  3,
                  5
                ];
              plugin = _step.value;
              _ = hooksList.push;
              return [
                4,
                plugin.setup(mergedPluginAPI)
              ];
            case 3:
              _.apply(hooksList, [
                _state.sent()
              ]);
              _state.label = 4;
            case 4:
              _iteratorNormalCompletion = true;
              return [
                3,
                2
              ];
            case 5:
              return [
                3,
                8
              ];
            case 6:
              err = _state.sent();
              _didIteratorError = true;
              _iteratorError = err;
              return [
                3,
                8
              ];
            case 7:
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
              return [
                7
              ];
            case 8:
              runners = generateRunner(hooksList, currentHooks);
              return [
                2,
                runners
              ];
          }
        });
      });
      return function init2() {
        return _ref.apply(this, arguments);
      };
    }();
    var run = function(cb) {
      return cb();
    };
    var manager = {
      createPlugin,
      isPlugin,
      usePlugin,
      init,
      run,
      clear,
      clone,
      registerHook,
      useRunner
    };
    return manager;
  };
  return clone();
};
export {
  DEFAULT_OPTIONS,
  cloneHook,
  cloneHooksMap,
  createAsyncInterruptWorkflow,
  createAsyncManager,
  createAsyncPipeline,
  createAsyncWaterfall,
  createAsyncWorkflow,
  createContext,
  createManager,
  createParallelWorkflow,
  createPipeline,
  createSyncParallelWorkflow,
  createWaterfall,
  createWorkflow,
  generateRunner,
  getAsyncBrook,
  getBrook,
  isAsyncInterruptWorkflow,
  isAsyncWaterfall,
  isAsyncWorkflow,
  isParallelWorkflow,
  isPipeline,
  isSyncParallelWorkflow,
  isWaterfall,
  isWorkflow
};
