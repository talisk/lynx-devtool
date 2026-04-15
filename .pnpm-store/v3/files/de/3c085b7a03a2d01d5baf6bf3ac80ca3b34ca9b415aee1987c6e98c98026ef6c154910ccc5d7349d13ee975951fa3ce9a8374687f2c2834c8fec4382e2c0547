class Storage {
  async keys() {
    var _this_forEach, _this;
    const _keys = [];
    (_this_forEach = (_this = this).forEach) === null || _this_forEach === void 0 ? void 0 : _this_forEach.call(_this, (_, k) => {
      _keys.push(k);
    });
    return _keys;
  }
  async values() {
    var _this_forEach, _this;
    const _values = [];
    (_this_forEach = (_this = this).forEach) === null || _this_forEach === void 0 ? void 0 : _this_forEach.call(_this, (v) => {
      _values.push(v);
    });
    return _values;
  }
  /**
  * Returns a specified element from the container. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Container.
  * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
  */
  get(key) {
    const uniqueKey = this.computedUniqueKey(key);
    return this.container.get(uniqueKey);
  }
  /**
  * Adds a new element with a specified key and value to the storage. If an element with the same key already exists, the element will be updated.
  */
  async set(key, value) {
    const uniqueKey = this.computedUniqueKey(key);
    await this.container.set(uniqueKey, value);
    return this;
  }
  /**
  * @returns boolean indicating whether an element with the specified key exists or not.
  */
  has(key) {
    const uniqueKey = this.computedUniqueKey(key);
    return this.container.has(uniqueKey);
  }
  delete(key) {
    const uniqueKey = this.computedUniqueKey(key);
    return this.container.delete(uniqueKey);
  }
  async clear() {
    var _this_keys, _this;
    const keys = await ((_this_keys = (_this = this).keys) === null || _this_keys === void 0 ? void 0 : _this_keys.call(_this));
    await Promise.all((keys === null || keys === void 0 ? void 0 : keys.map(async (key) => {
      return this.container.delete(key);
    })) || []);
  }
  forEach(fallbackFn) {
    var _this_container_forEach, _this_container;
    (_this_container_forEach = (_this_container = this.container).forEach) === null || _this_container_forEach === void 0 ? void 0 : _this_container_forEach.call(_this_container, (v, k) => {
      if (this.checkIsOwnkey(k)) {
        fallbackFn(v, k, this);
      }
    });
  }
  computedUniqueKey(k) {
    return `${this.namespace}:${k}`;
  }
  checkIsOwnkey(k) {
    return k.startsWith(this.namespace);
  }
  constructor(namespace, container) {
    this.namespace = namespace;
    this.container = container;
  }
}
export {
  Storage
};
