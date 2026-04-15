import { logger } from "@modern-js/utils";
var sourceDirAndFileNamesValidMessage = "At least one of the sourceDir and filenames configurations must be configured";
var watchDirValidMessage = "should set watchDir when enableWatch is true";
var validateSourceDirAndFileNames = function(compilerOptions) {
  var sourceDir = compilerOptions.sourceDir, filenames = compilerOptions.filenames, quiet = compilerOptions.quiet;
  if (!sourceDir && !filenames) {
    if (!quiet) {
      logger.error(sourceDirAndFileNamesValidMessage);
    }
    return {
      code: 1,
      message: sourceDirAndFileNamesValidMessage,
      virtualDists: []
    };
  }
  return null;
};
var validateWatchDir = function(compilerOptions) {
  var watchDir = compilerOptions.watchDir, enableWatch = compilerOptions.enableWatch, quiet = compilerOptions.quiet;
  if (enableWatch && !watchDir) {
    if (!quiet) {
      logger.error(watchDirValidMessage);
    }
    return {
      code: 1,
      message: watchDirValidMessage,
      virtualDists: []
    };
  }
  return null;
};
var validate = function(compilerOptions) {
  if (compilerOptions.enableWatch) {
    return validateWatchDir(compilerOptions);
  }
  return validateSourceDirAndFileNames(compilerOptions);
};
export {
  sourceDirAndFileNamesValidMessage,
  validate,
  validateSourceDirAndFileNames,
  validateWatchDir,
  watchDirValidMessage
};
