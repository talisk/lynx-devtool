"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var helpers_exports = {};
__export(helpers_exports, {
  startWatcher: () => startWatcher
});
module.exports = __toCommonJS(helpers_exports);
var import_path = __toESM(require("path"));
var import_server_core = require("@modern-js/server-core");
var import_utils = require("@modern-js/utils");
var import_watcher = __toESM(require("../dev-tools/watcher"));
var import_mock = require("./mock");
var import_utils2 = require("./utils");
__reExport(helpers_exports, require("./repack"), module.exports);
__reExport(helpers_exports, require("./devOptions"), module.exports);
__reExport(helpers_exports, require("./fileReader"), module.exports);
__reExport(helpers_exports, require("./mock"), module.exports);
async function onServerChange({ pwd, filepath, event, server }) {
  const { mock } = import_server_core.AGGRED_DIR;
  const mockPath = import_path.default.normalize(import_path.default.join(pwd, mock));
  const { runner } = server;
  if (filepath.startsWith(mockPath)) {
    await (0, import_mock.initOrUpdateMockMiddlewares)(pwd);
    import_utils.logger.info("Finish update the mock handlers");
  } else {
    try {
      const fileChangeEvent = {
        type: "file-change",
        payload: [
          {
            filename: filepath,
            event
          }
        ]
      };
      await runner.reset({
        event: fileChangeEvent
      });
      (0, import_utils2.debug)(`Finish reload server, trigger by ${filepath} ${event}`);
    } catch (e) {
      import_utils.logger.error(e);
    }
  }
}
function startWatcher({ pwd, distDir, apiDir, sharedDir, watchOptions, server }) {
  const { mock } = import_server_core.AGGRED_DIR;
  const defaultWatched = [
    `${mock}/**/*`,
    `${import_utils.SERVER_DIR}/**/*`,
    `${apiDir}/**`,
    `${sharedDir}/**/*`,
    `${distDir}/${import_utils.SERVER_BUNDLE_DIRECTORY}/*-server-loaders.js`
  ];
  const mergedWatchOptions = (0, import_watcher.mergeWatchOptions)(watchOptions);
  const defaultWatchedPaths = defaultWatched.map((p) => {
    const finalPath = import_path.default.isAbsolute(p) ? p : import_path.default.join(pwd, p);
    return import_path.default.normalize(finalPath);
  });
  const watcher = new import_watcher.default();
  watcher.createDepTree();
  watcher.listen(defaultWatchedPaths, mergedWatchOptions, (filepath, event) => {
    if (filepath.includes("-server-loaders.js")) {
      delete require.cache[filepath];
      return;
    } else {
      watcher.updateDepTree();
      watcher.cleanDepCache(filepath);
    }
    onServerChange({
      pwd,
      filepath,
      event,
      server
    });
  });
  return watcher;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  startWatcher,
  ...require("./repack"),
  ...require("./devOptions"),
  ...require("./fileReader"),
  ...require("./mock")
});
