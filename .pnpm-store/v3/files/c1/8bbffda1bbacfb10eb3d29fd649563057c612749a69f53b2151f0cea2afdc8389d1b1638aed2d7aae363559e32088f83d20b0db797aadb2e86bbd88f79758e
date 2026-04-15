import * as ah from "async_hooks";
const createStorage = () => {
  let storage;
  if (typeof ah.AsyncLocalStorage !== "undefined") {
    storage = new ah.AsyncLocalStorage();
  }
  const run = (context, cb) => {
    if (!storage) {
      throw new Error(`Unable to use async_hook, please confirm the node version >= 12.17
        `);
    }
    return new Promise((resolve, reject) => {
      storage.run(context, () => {
        try {
          return resolve(cb());
        } catch (error) {
          return reject(error);
        }
      });
    });
  };
  const useContext = () => {
    if (!storage) {
      throw new Error(`Unable to use async_hook, please confirm the node version >= 12.17
        `);
    }
    const context = storage.getStore();
    if (!context) {
      throw new Error(`Can't call useContext out of scope, make sure @modern-js/utils is a single version in node_modules`);
    }
    return context;
  };
  return {
    run,
    useContext
  };
};
export {
  createStorage
};
