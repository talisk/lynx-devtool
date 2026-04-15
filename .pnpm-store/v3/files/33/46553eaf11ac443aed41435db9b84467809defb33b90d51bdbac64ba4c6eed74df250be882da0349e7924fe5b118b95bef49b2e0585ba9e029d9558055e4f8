import LRU from "lru-cache";
class MemoryContainer {
  async get(key) {
    return this.cache.get(key);
  }
  async set(key, value) {
    this.cache.set(key, value);
    return this;
  }
  async has(key) {
    return this.cache.has(key);
  }
  async delete(key) {
    const exist = await this.has(key);
    if (exist) {
      this.cache.del(key);
    }
    return exist;
  }
  forEach(callbackFn) {
    this.cache.forEach((value, key) => {
      callbackFn(value, key, this);
    });
  }
  constructor({ max, maxAge } = {}) {
    this.cache = new LRU({
      max: (max || 256) * MemoryContainer.MB,
      maxAge: maxAge || MemoryContainer.hour
    });
  }
}
MemoryContainer.BYTE = 1;
MemoryContainer.KB = 1024 * MemoryContainer.BYTE;
MemoryContainer.MB = 1024 * MemoryContainer.KB;
MemoryContainer.ms = 1;
MemoryContainer.second = MemoryContainer.ms * 1e3;
MemoryContainer.minute = MemoryContainer.second * 60;
MemoryContainer.hour = MemoryContainer.minute * 60;
export {
  MemoryContainer
};
