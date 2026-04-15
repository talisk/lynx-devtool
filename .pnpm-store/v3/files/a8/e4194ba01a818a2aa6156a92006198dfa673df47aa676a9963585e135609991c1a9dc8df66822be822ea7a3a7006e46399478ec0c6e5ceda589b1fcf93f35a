import * as ah from "async_hooks";
var createStorage = function() {
  var storage;
  if (typeof ah.AsyncLocalStorage !== "undefined") {
    storage = new ah.AsyncLocalStorage();
  }
  var run = function(context, cb) {
    if (!storage) {
      throw new Error("Unable to use async_hook, please confirm the node version >= 12.17\n        ");
    }
    return new Promise(function(resolve, reject) {
      storage.run(context, function() {
        try {
          return resolve(cb());
        } catch (error) {
          return reject(error);
        }
      });
    });
  };
  var useContext = function() {
    if (!storage) {
      throw new Error("Unable to use async_hook, please confirm the node version >= 12.17\n        ");
    }
    var context = storage.getStore();
    if (!context) {
      throw new Error("Can't call useContext out of scope, make sure @modern-js/utils is a single version in node_modules");
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
