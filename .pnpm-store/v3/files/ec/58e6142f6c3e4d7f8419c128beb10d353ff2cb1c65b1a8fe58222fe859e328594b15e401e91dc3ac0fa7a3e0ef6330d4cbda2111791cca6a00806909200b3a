import { promisify } from "util";
import { logger } from "@modern-js/utils/logger";
import { generateClient } from "./generateClient";
async function loader(source) {
  var _this__compiler;
  this.cacheable();
  const target = (_this__compiler = this._compiler) === null || _this__compiler === void 0 ? void 0 : _this__compiler.options.target;
  const shouldSkip = (compileTarget) => {
    return target === compileTarget || Array.isArray(target) && target.includes(compileTarget);
  };
  if (shouldSkip("node") || shouldSkip("webworker") || shouldSkip("async-node")) {
    return source;
  }
  const { resourceQuery } = this;
  const options = resourceQuery.slice(1).split("&").reduce((pre, cur) => {
    const [key, value] = cur.split("=");
    if (key && value) {
      pre[key] = value === "true" ? true : value === "false" ? false : value;
    }
    return pre;
  }, {});
  if (!options.loaderId || options.retain) {
    return source;
  }
  if (options.clientData) {
    const readFile = promisify(this.fs.readFile);
    try {
      const clientDataPath = this.resourcePath.includes(".loader.") ? this.resourcePath.replace(".loader.", ".data.client.") : this.resourcePath.replace(".data.", ".data.client.");
      this.addDependency(clientDataPath);
      const clientDataContent = await readFile(clientDataPath);
      return clientDataContent;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        logger.error(`Failed to read the clientData file ${options.clientData}`);
      }
    }
  }
  const code = generateClient({
    inline: options.inline,
    action: options.action,
    routeId: options.routeId
  });
  return code;
}
export {
  loader as default
};
