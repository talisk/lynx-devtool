import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { promisify } from "util";
import { logger } from "@modern-js/utils/logger";
import { generateClient } from "./generateClient";
function loader(source) {
  return _loader.apply(this, arguments);
}
function _loader() {
  _loader = _async_to_generator(function(source) {
    var _this__compiler, target, shouldSkip, resourceQuery, options, readFile, clientDataPath, clientDataContent, error, code;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          this.cacheable();
          target = (_this__compiler = this._compiler) === null || _this__compiler === void 0 ? void 0 : _this__compiler.options.target;
          shouldSkip = function(compileTarget) {
            return target === compileTarget || Array.isArray(target) && target.includes(compileTarget);
          };
          if (shouldSkip("node") || shouldSkip("webworker") || shouldSkip("async-node")) {
            return [
              2,
              source
            ];
          }
          resourceQuery = this.resourceQuery;
          options = resourceQuery.slice(1).split("&").reduce(function(pre, cur) {
            var _cur_split = _sliced_to_array(cur.split("="), 2), key = _cur_split[0], value = _cur_split[1];
            if (key && value) {
              pre[key] = value === "true" ? true : value === "false" ? false : value;
            }
            return pre;
          }, {});
          if (!options.loaderId || options.retain) {
            return [
              2,
              source
            ];
          }
          if (!options.clientData)
            return [
              3,
              4
            ];
          readFile = promisify(this.fs.readFile);
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            3,
            ,
            4
          ]);
          clientDataPath = this.resourcePath.includes(".loader.") ? this.resourcePath.replace(".loader.", ".data.client.") : this.resourcePath.replace(".data.", ".data.client.");
          this.addDependency(clientDataPath);
          return [
            4,
            readFile(clientDataPath)
          ];
        case 2:
          clientDataContent = _state.sent();
          return [
            2,
            clientDataContent
          ];
        case 3:
          error = _state.sent();
          if (process.env.NODE_ENV === "development") {
            logger.error("Failed to read the clientData file ".concat(options.clientData));
          }
          return [
            3,
            4
          ];
        case 4:
          code = generateClient({
            inline: options.inline,
            action: options.action,
            routeId: options.routeId
          });
          return [
            2,
            code
          ];
      }
    });
  });
  return _loader.apply(this, arguments);
}
export {
  loader as default
};
