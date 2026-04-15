import { cutNameByHyphen } from "@modern-js/utils/universal";
function getAutoInjectEnv(appContext) {
  var metaName = appContext.metaName;
  var prefix = "".concat(cutNameByHyphen(metaName), "_").toUpperCase();
  var envReg = new RegExp("^".concat(prefix));
  return Object.keys(process.env).reduce(function(prev, key) {
    var value = process.env[key];
    if (envReg.test(key) && typeof value !== "undefined") {
      prev["process.env.".concat(key)] = value;
    }
    return prev;
  }, {});
}
export {
  getAutoInjectEnv
};
