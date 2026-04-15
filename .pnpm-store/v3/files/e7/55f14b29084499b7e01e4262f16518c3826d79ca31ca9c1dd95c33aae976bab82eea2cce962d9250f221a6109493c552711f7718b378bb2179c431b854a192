import { runtime } from "./base";
let globalRunner;
function setGlobalRunner(runner) {
  globalRunner = runner;
}
function getGlobalRunner() {
  if (globalRunner) {
    return globalRunner;
  }
  const runner = runtime.init();
  setGlobalRunner(runner);
  return runner;
}
export {
  getGlobalRunner,
  setGlobalRunner
};
