import { build } from "./build";
import { buildWatch } from "./buildWatch";
import { getFinalCompilerOption } from "./getFinalOption";
import { validate } from "./validate";
async function compiler(compilerOptions, babelOptions = {}) {
  const validRet = validate(compilerOptions);
  if (validRet) {
    return validRet;
  }
  const finalCompilerOption = getFinalCompilerOption(compilerOptions);
  if (compilerOptions.enableWatch) {
    return buildWatch(finalCompilerOption, babelOptions);
  } else {
    return build(finalCompilerOption, babelOptions);
  }
}
export * from "./buildWatch";
export * from "./type";
export {
  compiler
};
