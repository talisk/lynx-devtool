import { parsedJSONFromElement } from "@modern-js/runtime-utils/parsed";
import { isBrowser } from "../../common";
import { ROUTER_DATA_JSON_ID, SSR_DATA_JSON_ID } from "../constants";
import { getGlobalApp } from "../context";
import { getGlobalRunner } from "../plugin/runner";
function createRoot(UserApp) {
  const App = UserApp || getGlobalApp();
  if (isBrowser()) {
    window._SSR_DATA = window._SSR_DATA || parsedJSONFromElement(SSR_DATA_JSON_ID);
    window._ROUTER_DATA = window._ROUTER_DATA || parsedJSONFromElement(ROUTER_DATA_JSON_ID);
  }
  const runner = getGlobalRunner();
  const WrapperApp = runner.wrapRoot(App);
  return WrapperApp;
}
export {
  createRoot
};
