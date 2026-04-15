import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { AGGRED_DIR } from "@modern-js/server-core";
import { SERVER_BUNDLE_DIRECTORY, SERVER_DIR, logger } from "@modern-js/utils";
import Watcher, { mergeWatchOptions } from "../dev-tools/watcher";
import { initOrUpdateMockMiddlewares } from "./mock";
import { debug } from "./utils";
export * from "./repack";
export * from "./devOptions";
export * from "./fileReader";
export * from "./mock";
function onServerChange(_) {
  return _onServerChange.apply(this, arguments);
}
function _onServerChange() {
  _onServerChange = _async_to_generator(function(param) {
    var pwd, filepath, event, server, mock, mockPath, runner, fileChangeEvent, e;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          pwd = param.pwd, filepath = param.filepath, event = param.event, server = param.server;
          mock = AGGRED_DIR.mock;
          mockPath = path.normalize(path.join(pwd, mock));
          runner = server.runner;
          if (!filepath.startsWith(mockPath))
            return [
              3,
              2
            ];
          return [
            4,
            initOrUpdateMockMiddlewares(pwd)
          ];
        case 1:
          _state.sent();
          logger.info("Finish update the mock handlers");
          return [
            3,
            5
          ];
        case 2:
          _state.trys.push([
            2,
            4,
            ,
            5
          ]);
          fileChangeEvent = {
            type: "file-change",
            payload: [
              {
                filename: filepath,
                event
              }
            ]
          };
          return [
            4,
            runner.reset({
              event: fileChangeEvent
            })
          ];
        case 3:
          _state.sent();
          debug("Finish reload server, trigger by ".concat(filepath, " ").concat(event));
          return [
            3,
            5
          ];
        case 4:
          e = _state.sent();
          logger.error(e);
          return [
            3,
            5
          ];
        case 5:
          return [
            2
          ];
      }
    });
  });
  return _onServerChange.apply(this, arguments);
}
function startWatcher(param) {
  var pwd = param.pwd, distDir = param.distDir, apiDir = param.apiDir, sharedDir = param.sharedDir, watchOptions = param.watchOptions, server = param.server;
  var mock = AGGRED_DIR.mock;
  var defaultWatched = [
    "".concat(mock, "/**/*"),
    "".concat(SERVER_DIR, "/**/*"),
    "".concat(apiDir, "/**"),
    "".concat(sharedDir, "/**/*"),
    "".concat(distDir, "/").concat(SERVER_BUNDLE_DIRECTORY, "/*-server-loaders.js")
  ];
  var mergedWatchOptions = mergeWatchOptions(watchOptions);
  var defaultWatchedPaths = defaultWatched.map(function(p) {
    var finalPath = path.isAbsolute(p) ? p : path.join(pwd, p);
    return path.normalize(finalPath);
  });
  var watcher = new Watcher();
  watcher.createDepTree();
  watcher.listen(defaultWatchedPaths, mergedWatchOptions, function(filepath, event) {
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
export {
  startWatcher
};
