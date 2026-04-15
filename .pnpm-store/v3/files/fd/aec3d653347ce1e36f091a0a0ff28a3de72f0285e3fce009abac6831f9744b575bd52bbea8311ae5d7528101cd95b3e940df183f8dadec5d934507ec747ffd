import invariant from "invariant";
const createGetId = () => {
  const idCache = /* @__PURE__ */ new Map();
  return (objectId) => {
    const cachedId = idCache.get(objectId);
    if (cachedId) {
      return cachedId;
    }
    const id = JSON.stringify(objectId);
    invariant(id, "params should be not null value");
    idCache.set(objectId, id);
    return id;
  };
};
var LoaderStatus;
(function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["idle"] = 0] = "idle";
  LoaderStatus2[LoaderStatus2["loading"] = 1] = "loading";
  LoaderStatus2[LoaderStatus2["fulfilled"] = 2] = "fulfilled";
  LoaderStatus2[LoaderStatus2["rejected"] = 3] = "rejected";
})(LoaderStatus || (LoaderStatus = {}));
const createLoader = (id, initialData = {
  loading: false,
  reloading: false,
  data: void 0,
  error: void 0
}, loaderFn = () => Promise.resolve(), skip = false) => {
  let promise;
  let status = 0;
  let { data, error } = initialData;
  let hasLoaded = false;
  const handlers = /* @__PURE__ */ new Set();
  const load = async () => {
    if (skip) {
      return promise;
    }
    if (status === 1) {
      return promise;
    }
    status = 1;
    notify();
    promise = loaderFn().then((value) => {
      data = value;
      error = null;
      status = 2;
    }).catch((e) => {
      error = e;
      data = null;
      status = 3;
    }).finally(() => {
      promise = null;
      hasLoaded = true;
      notify();
    });
    return promise;
  };
  const getResult = () => ({
    loading: !hasLoaded && status === 1,
    reloading: hasLoaded && status === 1,
    data,
    error: error instanceof Error ? `${error.message}` : error,
    // redundant fields for ssr log
    _error: error
  });
  const notify = () => {
    [
      ...handlers
    ].forEach((handler) => {
      handler(status, getResult());
    });
  };
  const onChange = (handler) => {
    handlers.add(handler);
    return () => {
      handlers.delete(handler);
    };
  };
  return {
    get result() {
      return getResult();
    },
    get promise() {
      return promise;
    },
    onChange,
    load
  };
};
const createLoaderManager = (initialDataMap, managerOptions = {}) => {
  const { skipStatic = false, skipNonStatic = false } = managerOptions;
  const loadersMap = /* @__PURE__ */ new Map();
  const getId = createGetId();
  const add = (loaderFn, loaderOptions) => {
    const id = getId(loaderOptions.params);
    let loader = loadersMap.get(id);
    const cache = loaderOptions._cache;
    if (!loader || cache === false) {
      const ignoreNonStatic = skipNonStatic && !loaderOptions.static;
      const ignoreStatic = skipStatic && loaderOptions.static;
      const skipExec = ignoreNonStatic || ignoreStatic;
      loader = createLoader(
        id,
        typeof initialDataMap[id] !== "undefined" ? initialDataMap[id] : {
          data: loaderOptions.initialData
        },
        loaderFn,
        // Todo whether static loader is exec when CSR
        skipExec
      );
      loadersMap.set(id, loader);
    }
    return id;
  };
  const get = (id) => loadersMap.get(id);
  const hasPendingLoaders = () => {
    for (const loader of loadersMap.values()) {
      const { promise } = loader;
      if (promise instanceof Promise) {
        return true;
      }
    }
    return false;
  };
  const awaitPendingLoaders = async () => {
    const pendingLoaders = [];
    for (const [id, loader] of loadersMap) {
      const { promise } = loader;
      if (promise instanceof Promise) {
        pendingLoaders.push([
          id,
          loader
        ]);
      }
    }
    await Promise.all(pendingLoaders.map((item) => item[1].promise));
    return pendingLoaders.reduce((res, [id, loader]) => {
      res[id] = loader.result;
      return res;
    }, {});
  };
  return {
    hasPendingLoaders,
    awaitPendingLoaders,
    add,
    get
  };
};
export {
  LoaderStatus,
  createLoaderManager
};
