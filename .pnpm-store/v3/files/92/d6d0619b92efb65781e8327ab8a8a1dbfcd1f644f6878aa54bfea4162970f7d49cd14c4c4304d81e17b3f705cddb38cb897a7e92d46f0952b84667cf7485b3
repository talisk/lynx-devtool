import { DEFAULT_EXTENSIONS } from "@babel/core";
import { glob } from "@modern-js/utils";
import { mergeDefaultOption } from "./defaults";
const getGlobPattern = (dir, extensions) => {
  if (extensions.length > 1) {
    return `${dir}/**/*{${extensions.join(",")}}`;
  } else if (extensions.length === 1) {
    return `${dir}/**/*${extensions[0]}`;
  } else {
    return `${dir}/**/*`;
  }
};
const getFinalExtensions = (extensions) => {
  const isExtensions = (ext) => Array.isArray(ext);
  const isExtensionsFunc = (ext) => typeof ext === "function";
  if (isExtensions(extensions)) {
    return [
      ...extensions,
      ...DEFAULT_EXTENSIONS
    ];
  } else if (isExtensionsFunc(extensions)) {
    return extensions(DEFAULT_EXTENSIONS);
  } else {
    return DEFAULT_EXTENSIONS;
  }
};
const getFilesFromDir = ({ dir, finalExt = [], ignore = [] }) => {
  let globFindFilenames = [];
  const globPattern = getGlobPattern(dir, finalExt);
  globFindFilenames = glob.sync(globPattern, {
    ignore
  });
  return globFindFilenames;
};
const getFinalCompilerOption = (option) => {
  const optionWithDefault = mergeDefaultOption(option);
  const { sourceDir, ignore, enableWatch = false, watchDir, extensions = DEFAULT_EXTENSIONS } = option;
  let globFindFilenames = [];
  const finalExt = getFinalExtensions(extensions);
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
  return {
    ...optionWithDefault,
    filenames: [
      ...optionWithDefault.filenames,
      ...globFindFilenames
    ]
  };
};
export {
  getFilesFromDir,
  getFinalCompilerOption,
  getFinalExtensions,
  getGlobPattern
};
