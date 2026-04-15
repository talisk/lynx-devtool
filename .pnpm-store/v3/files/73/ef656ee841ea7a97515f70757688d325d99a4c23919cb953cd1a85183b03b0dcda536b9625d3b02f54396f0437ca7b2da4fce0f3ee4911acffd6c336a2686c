import { merge } from "ts-deepmerge";
const loadConfig = ({ cliConfig, serverConfig }) => {
  const config = merge({
    ...cliConfig,
    plugins: []
  }, serverConfig);
  return config;
};
export {
  loadConfig
};
