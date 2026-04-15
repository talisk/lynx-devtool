const getRuntimeEnv = () => {
  var _globalThis_process_release, _globalThis_process, _globalThis;
  if (((_globalThis = globalThis) === null || _globalThis === void 0 ? void 0 : (_globalThis_process = _globalThis.process) === null || _globalThis_process === void 0 ? void 0 : (_globalThis_process_release = _globalThis_process.release) === null || _globalThis_process_release === void 0 ? void 0 : _globalThis_process_release.name) === "node") {
    return "node";
  }
  return "other";
};
const checkIsProd = () => {
  const env = getRuntimeEnv();
  switch (env) {
    case "node":
      return process.env.NODE_ENV === "production";
    default:
      return false;
  }
};
export {
  checkIsProd,
  getRuntimeEnv
};
