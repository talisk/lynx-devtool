import { logger } from "@modern-js/utils";
const sourceDirAndFileNamesValidMessage = "At least one of the sourceDir and filenames configurations must be configured";
const watchDirValidMessage = "should set watchDir when enableWatch is true";
const validateSourceDirAndFileNames = (compilerOptions) => {
  const { sourceDir, filenames, quiet } = compilerOptions;
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
const validateWatchDir = (compilerOptions) => {
  const { watchDir, enableWatch, quiet } = compilerOptions;
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
const validate = (compilerOptions) => {
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
