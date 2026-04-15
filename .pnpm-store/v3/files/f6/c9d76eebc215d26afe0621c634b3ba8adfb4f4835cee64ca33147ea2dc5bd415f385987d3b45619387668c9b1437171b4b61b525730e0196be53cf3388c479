import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { fs, dotenv, dotenvExpand } from "@modern-js/utils";
function loadServerEnv(options) {
  return _loadServerEnv.apply(this, arguments);
}
function _loadServerEnv() {
  _loadServerEnv = _async_to_generator(function(options) {
    var pwd, serverEnv, defaultEnvPath, serverEnvPath, _i, _iter, envPath, _tmp, envConfig;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          pwd = options.pwd;
          serverEnv = process.env.MODERN_ENV;
          defaultEnvPath = path.resolve(pwd, ".env");
          serverEnvPath = path.resolve(pwd, ".env.".concat(serverEnv));
          _i = 0, _iter = [
            serverEnvPath,
            defaultEnvPath
          ];
          _state.label = 1;
        case 1:
          if (!(_i < _iter.length))
            return [
              3,
              6
            ];
          envPath = _iter[_i];
          return [
            4,
            fs.pathExists(envPath)
          ];
        case 2:
          _tmp = _state.sent();
          if (!_tmp)
            return [
              3,
              4
            ];
          return [
            4,
            fs.stat(envPath)
          ];
        case 3:
          _tmp = !_state.sent().isDirectory();
          _state.label = 4;
        case 4:
          if (_tmp) {
            envConfig = dotenv.config({
              path: envPath
            });
            dotenvExpand(envConfig);
          }
          _state.label = 5;
        case 5:
          _i++;
          return [
            3,
            1
          ];
        case 6:
          return [
            2
          ];
      }
    });
  });
  return _loadServerEnv.apply(this, arguments);
}
export {
  loadServerEnv
};
