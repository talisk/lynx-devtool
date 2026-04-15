import { utils } from "@modern-js-reduck/store";
import { unstable_batchedUpdates } from "react-dom";
const combineSubscribe = (store, subscribes) => {
  let changed = false;
  const handlers = /* @__PURE__ */ new Set();
  return (handler) => {
    handlers.add(handler);
    const disposer = [];
    subscribes.forEach((subscribe) => {
      disposer.push(subscribe(() => {
        changed = true;
      }));
    });
    const unsubscribeStore = store.subscribe(() => {
      if (changed) {
        handlers.forEach((h) => h());
      }
      changed = false;
    });
    return () => {
      unsubscribeStore();
      disposer.forEach((dispose) => dispose());
    };
  };
};
const createBatchManager = (store) => {
  const usingModelsMap = /* @__PURE__ */ new Map();
  let unsubscribe;
  const updateList = [];
  const setupSubscribe = () => {
    if (typeof unsubscribe === "function") {
      unsubscribe();
    }
    const modelSet = /* @__PURE__ */ new Set();
    for (const [model, count] of usingModelsMap) {
      if (count !== 0) {
        modelSet.add(model);
      }
    }
    const subscribe = combineSubscribe(store, [
      ...modelSet
    ].map((m) => store.use(m)[2]));
    unsubscribe = subscribe(() => {
      unstable_batchedUpdates(() => {
        let update = updateList.shift();
        while (update) {
          update();
          update = updateList.shift();
        }
      });
    });
  };
  const changeModels = (action, ...models) => {
    models.forEach((model) => {
      if (!utils.isModel(model)) {
        return;
      }
      let usingCount = usingModelsMap.get(model);
      if (action === "add") {
        usingModelsMap.set(model, (usingCount || 0) + 1);
      } else if (action === "remove") {
        if (usingCount) {
          usingCount -= 1;
          if (usingCount === 0) {
            usingModelsMap.delete(model);
          } else {
            usingModelsMap.set(model, usingCount);
          }
        }
      }
    });
    setupSubscribe();
  };
  const addModels = (...args) => changeModels("add", ...args);
  const removeModels = (...args) => changeModels("remove", ...args);
  const pushUpdate = (update) => {
    updateList.push(update);
  };
  return {
    addModels,
    removeModels,
    pushUpdate
  };
};
export { createBatchManager };
