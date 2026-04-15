import { logPlugin } from "./log";
import { initMonitorsPlugin, injectServerTiming, injectloggerPluigin } from "./monitors";
import { processedByPlugin } from "./processedBy";
import { injectRenderHandlerPlugin } from "./render";
function createDefaultPlugins(options = {}) {
  const plugins = [
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
