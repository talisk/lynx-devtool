import { fileReader } from "@modern-js/runtime-utils/fileReader";
const cleanSSRCache = (distDir) => {
  Object.keys(require.cache).forEach((key) => {
    if (key.startsWith(distDir)) {
      delete require.cache[key];
    }
  });
};
const onRepack = (distDir, runner) => {
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
