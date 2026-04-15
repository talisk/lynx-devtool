import { fileReader } from "@modern-js/runtime-utils/fileReader";
var cleanSSRCache = function(distDir) {
  Object.keys(require.cache).forEach(function(key) {
    if (key.startsWith(distDir)) {
      delete require.cache[key];
    }
  });
};
var onRepack = function(distDir, runner) {
  cleanSSRCache(distDir);
  fileReader.reset();
  runner.reset({
    event: {
      type: "repack"
    }
  });
};
export {
  onRepack
};
