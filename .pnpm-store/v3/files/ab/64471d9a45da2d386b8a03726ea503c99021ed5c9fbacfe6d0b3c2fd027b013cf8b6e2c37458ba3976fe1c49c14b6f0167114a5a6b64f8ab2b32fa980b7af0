"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var https_exports = {};
__export(https_exports, {
  genHttpsOptions: () => genHttpsOptions
});
module.exports = __toCommonJS(https_exports);
var import_utils = require("@modern-js/utils");
const genHttpsOptions = async (userOptions, pwd) => {
  const httpsOptions = typeof userOptions === "boolean" ? {} : userOptions;
  if (!httpsOptions.key || !httpsOptions.cert) {
    let devcertPath;
    try {
      devcertPath = require.resolve("devcert", {
        paths: [
          pwd,
          __dirname
        ]
      });
    } catch (err) {
      const packageManager = await (0, import_utils.getPackageManager)(pwd);
      const command = import_utils.chalk.yellow.bold(`${packageManager} add devcert@1.2.2 -D`);
      import_utils.logger.error(`You have enabled "dev.https" option, but the "devcert" package is not installed.`);
      import_utils.logger.error(`Please run ${command} to install manually, otherwise the https can not work.`);
      throw new Error('[https] "devcert" is not found.');
    }
    const devcert = require(devcertPath);
    const selfsign = await devcert.certificateFor([
      "localhost"
    ]);
    return selfsign;
  }
  return httpsOptions;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  genHttpsOptions
});
