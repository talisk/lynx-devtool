import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { glob } from "@modern-js/utils";
import { mergeDefaultOption } from "./defaults";
var getGlobPattern = function(dir, extensions) {
  if (extensions.length > 1) {
    return "".concat(dir, "/**/*{").concat(extensions.join(","), "}");
  } else if (extensions.length === 1) {
    return "".concat(dir, "/**/*").concat(extensions[0]);
  } else {
    return "".concat(dir, "/**/*");
  }
};
var getFinalExtensions = function(extensions) {
  var isExtensions = function(ext) {
    return Array.isArray(ext);
  };
  var isExtensionsFunc = function(ext) {
    return typeof ext === "function";
  };
  if (isExtensions(extensions)) {
    return _to_consumable_array(extensions).concat(_to_consumable_array(DEFAULT_EXTENSIONS));
  } else if (isExtensionsFunc(extensions)) {
    return extensions(DEFAULT_EXTENSIONS);
  } else {
    return DEFAULT_EXTENSIONS;
  }
};
var getFilesFromDir = function(param) {
  var dir = param.dir, _param_finalExt = param.finalExt, finalExt = _param_finalExt === void 0 ? [] : _param_finalExt, _param_ignore = param.ignore, ignore = _param_ignore === void 0 ? [] : _param_ignore;
  var globFindFilenames = [];
  var globPattern = getGlobPattern(dir, finalExt);
  globFindFilenames = glob.sync(globPattern, {
    ignore
  });
  return globFindFilenames;
};
var getFinalCompilerOption = function(option) {
  var optionWithDefault = mergeDefaultOption(option);
  var sourceDir = option.sourceDir, ignore = option.ignore, _option_enableWatch = option.enableWatch, enableWatch = _option_enableWatch === void 0 ? false : _option_enableWatch, watchDir = option.watchDir, _option_extensions = option.extensions, extensions = _option_extensions === void 0 ? DEFAULT_EXTENSIONS : _option_extensions;
  var globFindFilenames = [];
  var finalExt = getFinalExtensions(extensions);
  if (sourceDir) {
    globFindFilenames = getFilesFromDir({
      dir: sourceDir,
      ignore,
      finalExt
    });
  }
  if (enableWatch) {
    globFindFilenames = getFilesFromDir({
      dir: watchDir,
      ignore,
      finalExt
    });
  }
  return _object_spread_props(_object_spread({}, optionWithDefault), {
    filenames: _to_consumable_array(optionWithDefault.filenames).concat(_to_consumable_array(globFindFilenames))
  });
};
export {
  getFilesFromDir,
  getFinalCompilerOption,
  getFinalExtensions,
  getGlobPattern
};
