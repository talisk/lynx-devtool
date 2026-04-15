import crypto from "crypto";
import fs from "fs";
class StatsCache {
  add(files) {
    const { cachedHash, cachedSize } = this;
    for (const filename of files) {
      if (fs.existsSync(filename)) {
        const stats = fs.statSync(filename);
        if (stats.isFile() && !cachedHash[filename]) {
          cachedHash[filename] = this.hash(stats, filename);
          cachedSize[filename] = stats.size;
        }
      }
    }
  }
  refresh(filename) {
    const { cachedHash, cachedSize } = this;
    if (fs.existsSync(filename)) {
      const stats = fs.statSync(filename);
      if (stats.isFile()) {
        cachedHash[filename] = this.hash(stats, filename);
        cachedSize[filename] = stats.size;
      }
    }
  }
  del(filename) {
    if (this.cachedHash[filename]) {
      delete this.cachedHash[filename];
      delete this.cachedSize[filename];
    }
  }
  isDiff(filename) {
    const { cachedHash, cachedSize } = this;
    const stats = fs.statSync(filename);
    const hash = cachedHash[filename];
    const size = cachedSize[filename];
    if (stats.size !== size) {
      return true;
    }
    if (this.hash(stats, filename) !== hash) {
      return true;
    }
    return false;
  }
  has(filename) {
    return Boolean(this.cachedHash[filename]);
  }
  hash(stats, filename) {
    return crypto.createHash("md5").update(fs.readFileSync(filename)).digest("hex");
  }
  constructor() {
    this.cachedHash = {};
    this.cachedSize = {};
  }
}
export {
  StatsCache
};
