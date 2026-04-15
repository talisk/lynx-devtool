import { logPlugin } from "./log";
import { initMonitorsPlugin, injectServerTiming, injectloggerPluigin } from "./monitors";
import { processedByPlugin } from "./processedBy";
import { injectRenderHandlerPlugin } from "./render";
function createDefaultPlugins() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var plugins = [
    initMonitorsPlugin(),
    injectRenderHandlerPlugin(options),
    injectloggerPluigin(options.logger),
    injectServerTiming(),
    logPlugin(),
    processedByPlugin()
  ];
  return plugins;
}
export {
  createDefaultPlugins
};
