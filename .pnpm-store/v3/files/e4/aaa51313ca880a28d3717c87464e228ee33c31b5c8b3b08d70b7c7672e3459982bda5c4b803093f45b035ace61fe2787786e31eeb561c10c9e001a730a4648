import path from "path";
import { SERVICE_WORKER_ENVIRONMENT_NAME } from "@modern-js/uni-builder";
var builderPluginAdapterBasic = function() {
  return {
    name: "builder-plugin-adapter-modern-basic",
    setup: function setup(api) {
      api.modifyBundlerChain(function(chain, param) {
        var target = param.target, CHAIN_ID = param.CHAIN_ID, environment = param.environment;
        var isServiceWorker = environment.name === SERVICE_WORKER_ENVIRONMENT_NAME;
        if (target === "node" || isServiceWorker) {
          applyNodeCompat(isServiceWorker, chain);
        }
        if (target === "web") {
          var bareServerModuleReg = /\.(server|node)\.[tj]sx?$/;
          chain.module.rule(CHAIN_ID.RULE.JS).exclude.add(bareServerModuleReg);
          chain.module.rule("bare-server-module").test(bareServerModuleReg).use("server-module-loader").loader(require.resolve("../loaders/serverModuleLoader"));
        }
        chain.resolve.modules.add("node_modules").add(path.join(api.context.rootPath, "node_modules"));
      });
    }
  };
};
function applyNodeCompat(isServiceWorker, chain) {
  var nodeExts = [
    ".node.js",
    ".node.jsx",
    ".node.ts",
    ".node.tsx",
    ".server.js",
    ".server.jsx",
    ".server.ts",
    ".server.tsx"
  ];
  var webWorkerExts = [
    ".worker.js",
    ".worker.jsx",
    ".worker.ts",
    ".worker.tsx"
  ];
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = nodeExts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ext = _step.value;
      chain.resolve.extensions.prepend(ext);
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
  if (isServiceWorker) {
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
    try {
      for (var _iterator1 = webWorkerExts[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
        var ext1 = _step1.value;
        chain.resolve.extensions.prepend(ext1);
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
  }
}
export {
  builderPluginAdapterBasic
};
