import * as Event from "events";
import * as path from "path";
import { WatchChangeType, logger, watch } from "@modern-js/utils";
import { build } from "./build";
import { CompilerErrorResult } from "./compilerErrorResult";
const BuildWatchEvent = {
  firstCompiler: "first-compiler",
  compiling: "compiling",
  watchingCompiler: "watching-compiler"
};
class BuildWatchEmitter extends Event.EventEmitter {
  setInitFn(fn) {
    this._initFn = fn;
  }
  async watch() {
    if (typeof this._initFn === "function") {
      return this._initFn(this);
    }
    return null;
  }
}
const runBuildWatch = async (option, babelConfig = {}, emitter) => {
  emitter.emit(BuildWatchEvent.compiling);
  const errorResult = new CompilerErrorResult();
  const watchDir = option.watchDir;
  const { distDir, quiet } = option;
  const firstBuildResult = await build(option, babelConfig);
  const { code } = firstBuildResult;
  if (code === 1) {
    errorResult.init(firstBuildResult);
    emitter.emit(BuildWatchEvent.firstCompiler, errorResult.value);
  } else {
    emitter.emit(BuildWatchEvent.firstCompiler, firstBuildResult);
  }
  return watch(`${watchDir}/**/*.{js,jsx,ts,tsx}`, async ({ changeType, changedFilePath }) => {
    emitter.emit(BuildWatchEvent.compiling);
    if (changeType === WatchChangeType.UNLINK) {
      const removeFiles = [
        path.normalize(`./${distDir}/${path.relative(watchDir, changedFilePath)}`)
      ];
      if (!quiet) {
        logger.info(`remove file: ${removeFiles.join(",")}`);
      }
      const result2 = {
        code: 0,
        message: `remove file: ${removeFiles.join(",")}`,
        removeFiles
      };
      emitter.emit(BuildWatchEvent.watchingCompiler, result2);
      return;
    }
    const result = await build({
      ...option,
      filenames: [
        changedFilePath
      ]
    }, babelConfig);
    if (result.code === 1) {
      errorResult.update(result.messageDetails || []);
      emitter.emit(BuildWatchEvent.watchingCompiler, errorResult.value);
      !quiet && logger.info(errorResult.value.message);
    } else {
      errorResult.removeByFileName(changedFilePath);
      if (errorResult.checkExistError()) {
        emitter.emit(BuildWatchEvent.watchingCompiler, {
          ...errorResult.value,
          virtualDists: result.virtualDists
        });
        !quiet && logger.info(errorResult.value.message);
      } else {
        emitter.emit(BuildWatchEvent.watchingCompiler, result);
        !quiet && logger.info(result.message);
      }
    }
  }, [
    `${watchDir}/**/*.d.ts`
  ]);
};
const buildWatch = (option, babelConfig = {}) => {
  const buildWatchEmitter = new BuildWatchEmitter();
  buildWatchEmitter.setInitFn(runBuildWatch.bind(null, option, babelConfig));
  return buildWatchEmitter;
};
export {
  BuildWatchEmitter,
  BuildWatchEvent,
  buildWatch,
  runBuildWatch
};
