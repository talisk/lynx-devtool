import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { build } from "./build";
import { buildWatch } from "./buildWatch";
import { getFinalCompilerOption } from "./getFinalOption";
import { validate } from "./validate";
function compiler(compilerOptions) {
  return _compiler.apply(this, arguments);
}
function _compiler() {
  _compiler = _async_to_generator(function(compilerOptions) {
    var babelOptions, validRet, finalCompilerOption;
    var _arguments = arguments;
    return _ts_generator(this, function(_state) {
      babelOptions = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
      validRet = validate(compilerOptions);
      if (validRet) {
        return [
          2,
          validRet
        ];
      }
      finalCompilerOption = getFinalCompilerOption(compilerOptions);
      if (compilerOptions.enableWatch) {
        return [
          2,
          buildWatch(finalCompilerOption, babelOptions)
        ];
      } else {
        return [
          2,
          build(finalCompilerOption, babelOptions)
        ];
      }
      return [
        2
      ];
    });
  });
  return _compiler.apply(this, arguments);
}
export * from "./buildWatch";
export * from "./type";
export {
  compiler
};
