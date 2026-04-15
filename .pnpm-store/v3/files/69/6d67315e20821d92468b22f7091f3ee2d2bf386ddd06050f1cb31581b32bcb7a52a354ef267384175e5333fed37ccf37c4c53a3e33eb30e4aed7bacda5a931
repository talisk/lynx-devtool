import { runtime } from "./base";
var globalRunner;
function setGlobalRunner(runner) {
  globalRunner = runner;
}
function getGlobalRunner() {
  if (globalRunner) {
    return globalRunner;
  }
  var runner = runtime.init();
  setGlobalRunner(runner);
  return runner;
}
export {
  getGlobalRunner,
  setGlobalRunner
};
