import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { chalk, getPackageManager, logger } from "@modern-js/utils";
var genHttpsOptions = function() {
  var _ref = _async_to_generator(function(userOptions, pwd) {
    var httpsOptions, devcertPath, err, packageManager, command, devcert, selfsign;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          httpsOptions = typeof userOptions === "boolean" ? {} : userOptions;
          if (!(!httpsOptions.key || !httpsOptions.cert))
            return [
              3,
              6
            ];
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            2,
            ,
            4
          ]);
          devcertPath = require.resolve("devcert", {
            paths: [
              pwd,
              __dirname
            ]
          });
          return [
            3,
            4
          ];
        case 2:
          err = _state.sent();
          return [
            4,
            getPackageManager(pwd)
          ];
        case 3:
          packageManager = _state.sent();
          command = chalk.yellow.bold("".concat(packageManager, " add devcert@1.2.2 -D"));
          logger.error('You have enabled "dev.https" option, but the "devcert" package is not installed.');
          logger.error("Please run ".concat(command, " to install manually, otherwise the https can not work."));
          throw new Error('[https] "devcert" is not found.');
        case 4:
          devcert = require(devcertPath);
          return [
            4,
            devcert.certificateFor([
              "localhost"
            ])
          ];
        case 5:
          selfsign = _state.sent();
          return [
            2,
            selfsign
          ];
        case 6:
          return [
            2,
            httpsOptions
          ];
      }
    });
  });
  return function genHttpsOptions2(userOptions, pwd) {
    return _ref.apply(this, arguments);
  };
}();
export {
  genHttpsOptions
};
