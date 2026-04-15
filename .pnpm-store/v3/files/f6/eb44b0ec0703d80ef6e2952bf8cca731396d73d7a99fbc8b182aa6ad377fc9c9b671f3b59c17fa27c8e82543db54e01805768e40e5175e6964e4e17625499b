import Fs from "@modern-js/utils/fs-extra";
import { createMemoryStorage } from "./storer";
class FileReader {
  async readFile(path, encoding = "utf-8") {
    const { fs } = this;
    const cache = await this.storage.get(path);
    if (cache === null) {
      return null;
    }
    if (cache) {
      return this.encodingContent(cache, encoding);
    }
    const isExistFile = await new Promise((resolve) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false);
          return;
        }
        if (stats.isFile()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    if (isExistFile) {
      const content = await fs.promises.readFile(path);
      this.storage.set(path, content);
      return this.encodingContent(content, encoding);
    } else {
      this.storage.set(path, null);
      return null;
    }
  }
  /**
  * Clear the fileCache entriely.
  */
  reset(fs) {
    var _this_storage_clear, _this_storage;
    fs && (this.fs = fs);
    return (_this_storage_clear = (_this_storage = this.storage).clear) === null || _this_storage_clear === void 0 ? void 0 : _this_storage_clear.call(_this_storage);
  }
  encodingContent(value, encoding) {
    if (encoding === "utf-8") {
      return value.toString();
    }
    return value;
  }
  constructor(storage) {
    this.fs = Fs;
    this.storage = storage;
  }
}
const fileReader = new FileReader(createMemoryStorage("__file__system"));
export {
  FileReader,
  fileReader
};
