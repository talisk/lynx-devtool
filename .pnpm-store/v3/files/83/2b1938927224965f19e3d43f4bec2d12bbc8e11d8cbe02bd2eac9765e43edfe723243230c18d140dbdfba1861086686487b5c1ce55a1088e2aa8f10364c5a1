class LoaderContext {
  getDefaultValue() {
    if (!this.defaultValue) {
      throw new Error("Can't get defaultValue before initialed");
    }
    return this.defaultValue;
  }
  constructor(defaultValue) {
    this.defaultValue = defaultValue;
    this.symbol = Symbol("loaderContext");
  }
}
function createLoaderContext(defaultValue) {
  return new LoaderContext(defaultValue);
}
export {
  LoaderContext,
  createLoaderContext
};
