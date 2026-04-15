class TypescriptLoader {
  load() {
    if (this.tsBinary) {
      return this.tsBinary;
    }
    try {
      const tsPath = require.resolve("typescript", {
        paths: [
          this.appDirectory || process.cwd()
        ]
      });
      const ts = require(tsPath);
      return ts;
    } catch (error) {
      throw new Error('TypeScript could not be found! Please, install "typescript" package.');
    }
  }
  constructor({ appDirectory }) {
    this.appDirectory = appDirectory;
  }
}
export {
  TypescriptLoader
};
