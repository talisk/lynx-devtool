import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { fs, logger } from "@modern-js/utils";
import { compiler } from "./compiler";
import { defaultDistFileExtMap } from "./constants";
var build = function() {
  var _ref = _async_to_generator(function(option) {
    var babelConfig, rootDir, enableVirtualDist, filenames, clean, distDir, _option_distFileExtMap, distFileExtMap, _option_verbose, verbose, _option_quiet, quiet, virtualDists, messageDetails, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filename, dist, happenError;
    var _arguments = arguments;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          babelConfig = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
          rootDir = option.rootDir, enableVirtualDist = option.enableVirtualDist, filenames = option.filenames, clean = option.clean, distDir = option.distDir, _option_distFileExtMap = option.distFileExtMap, distFileExtMap = _option_distFileExtMap === void 0 ? defaultDistFileExtMap : _option_distFileExtMap, _option_verbose = option.verbose, verbose = _option_verbose === void 0 ? false : _option_verbose, _option_quiet = option.quiet, quiet = _option_quiet === void 0 ? false : _option_quiet;
          virtualDists = [];
          if (!clean)
            return [
              3,
              2
            ];
          return [
            4,
            fs.remove(distDir)
          ];
        case 1:
          _state.sent();
          _state.label = 2;
        case 2:
          fs.ensureDir(distDir);
          messageDetails = [];
          _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
          try {
            for (_iterator = filenames[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              filename = _step.value;
              try {
                dist = compiler({
                  rootDir,
                  enableVirtualDist,
                  filepath: filename,
                  distDir,
                  verbose,
                  quiet,
                  babelConfig,
                  distFileExtMap
                });
                if (enableVirtualDist && dist) {
                  virtualDists.push(dist);
                }
              } catch (e) {
                messageDetails.push({
                  filename,
                  content: e.toString()
                });
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
          happenError = messageDetails.length > 0;
          if (!quiet) {
            if (happenError) {
              logger.error("Compilation failure ".concat(messageDetails.length, " ").concat(messageDetails.length !== 1 ? "files" : "file", " with Babel."));
            } else {
              logger.info("Successfully compiled ".concat(filenames.length, " ").concat(filenames.length !== 1 ? "files" : "file", " with Babel."));
            }
          }
          if (happenError) {
            return [
              2,
              {
                code: 1,
                message: "Compilation failure ".concat(messageDetails.length, " ").concat(messageDetails.length !== 1 ? "files" : "file", " with Babel."),
                messageDetails
              }
            ];
          }
          return [
            2,
            {
              code: 0,
              message: "Successfully compiled ".concat(filenames.length, " ").concat(filenames.length !== 1 ? "files" : "file", " with Babel."),
              virtualDists
            }
          ];
      }
    });
  });
  return function build2(option) {
    return _ref.apply(this, arguments);
  };
}();
export {
  build
};
