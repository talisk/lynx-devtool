const injectNodeSeverPlugin = ({ nodeServer }) => ({
  name: "@modern-js/plugin-inject-node-server",
  setup(api) {
    const appContext = api.useAppContext();
    api.setAppContext({
      ...appContext,
      nodeServer
    });
    return {};
  }
});
export {
  injectNodeSeverPlugin
};
