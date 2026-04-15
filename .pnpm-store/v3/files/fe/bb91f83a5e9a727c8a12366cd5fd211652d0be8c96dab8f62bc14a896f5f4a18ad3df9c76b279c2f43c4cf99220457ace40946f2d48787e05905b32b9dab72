const createContext = (value) => {
  let currentValue = value;
  return {
    use: () => ({
      get value() {
        return currentValue;
      },
      set value(v) {
        currentValue = v;
      }
    }),
    get: () => currentValue,
    set: (v1) => {
      currentValue = v1;
    }
  };
};
export {
  createContext
};
