import { HMR_SOCK_PATH } from "@modern-js/utils/universal/constants";
var getDefaultDevOptions = function() {
  return {
    client: {
      path: HMR_SOCK_PATH,
      // By default it is set to the port number of the dev server
      port: "",
      // By default it is set to "location.hostname"
      host: "",
      // By default it is set to "location.protocol === 'https:' ? 'wss' : 'ws'""
      protocol: void 0
    },
    https: false,
    devMiddleware: {
      writeToDisk: true
    },
    watch: true,
    hot: true,
    compress: true,
    liveReload: true
  };
};
export {
  getDefaultDevOptions
};
