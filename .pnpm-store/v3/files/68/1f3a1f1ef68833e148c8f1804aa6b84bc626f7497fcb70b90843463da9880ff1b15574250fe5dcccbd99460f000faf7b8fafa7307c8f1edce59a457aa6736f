import { initializerSymbol } from "../utils/misc";
const model = (name) => ({
  define(modelDesc) {
    let modelInitializer;
    if (typeof modelDesc === "function") {
      modelInitializer = modelDesc;
    } else {
      modelInitializer = () => modelDesc;
    }
    const modelCache = /* @__PURE__ */ new Map();
    const createResponse = (initializer) => {
      const response = (namespace) => {
        const cachedModel = modelCache.get(namespace);
        if (cachedModel) {
          return cachedModel;
        }
        const clonedModelInitializer = (...args) => {
          const result = initializer(...args);
          return result;
        };
        const modelInstance = createResponse(clonedModelInitializer);
        modelCache.set(namespace, modelInstance);
        modelInstance._name = namespace || name;
        return modelInstance;
      };
      response._name = name;
      Object.defineProperty(response, initializerSymbol, {
        configurable: false,
        enumerable: false,
        value: initializer
      });
      return response;
    };
    return createResponse(modelInitializer);
  }
});
export default model;
