function createRequestContext(context) {
  var _context = context || /* @__PURE__ */ new Map();
  function get(key) {
    if (typeof key === "string") {
      return _context.get(key);
    } else {
      return _context.get(key.symbol) || key.getDefaultValue();
    }
  }
  function set(key, value) {
    if (typeof key === "string") {
      _context.set(key, value);
    } else {
      _context.set(key.symbol, value);
    }
  }
  return {
    set,
    get
  };
}
export {
  createRequestContext
};
