import path from "path";
import { fs, DEFAULT_SERVER_CONFIG, OUTPUT_CONFIG_FILE, lodash as _, compatibleRequire, ensureAbsolutePath, requireExistModule } from "@modern-js/utils";
import { parse } from "flatted";
const requireConfig = async (serverConfigPath) => {
  if (fs.pathExistsSync(serverConfigPath)) {
    return compatibleRequire(serverConfigPath);
  }
  return void 0;
};
async function loadServerConfigNew(serverConfigPath) {
  const mod = await requireExistModule(serverConfigPath);
  if (mod) {
    return mod;
  }
  return void 0;
}
async function loadServerConfigOld(pwd, configFile) {
  const serverConfigPath = path.join(pwd, `${configFile}.cjs`);
  const serverConfig = await requireConfig(serverConfigPath);
  return serverConfig;
}
async function loadServerRuntimeConfig(pwd, oldServerFile = DEFAULT_SERVER_CONFIG, newServerConfigPath) {
  const newServerConfig = newServerConfigPath && await loadServerConfigNew(newServerConfigPath);
  if (newServerConfig) {
    return newServerConfig;
  }
  const oldServerConfig = await loadServerConfigOld(pwd, oldServerFile);
  return oldServerConfig;
}
function loadServerCliConfig(pwd, defaultConfig = {}) {
  var _defaultConfig_output_distPath, _defaultConfig_output;
  const cliConfigPath = ensureAbsolutePath(pwd, path.join(((_defaultConfig_output = defaultConfig.output) === null || _defaultConfig_output === void 0 ? void 0 : (_defaultConfig_output_distPath = _defaultConfig_output.distPath) === null || _defaultConfig_output_distPath === void 0 ? void 0 : _defaultConfig_output_distPath.root) || "dist", OUTPUT_CONFIG_FILE));
  let cliConfig = {
    output: {},
    source: {},
    tools: {},
    server: {},
    security: {},
    runtime: {},
    bff: {},
    html: {},
    dev: {}
  };
  try {
    const content = fs.readFileSync(cliConfigPath, "utf-8");
    cliConfig = parse(content);
  } catch (_2) {
  }
  const mergedCliConfig = _.merge(defaultConfig, cliConfig);
  return mergedCliConfig;
}
export {
  loadServerCliConfig,
  loadServerRuntimeConfig
};
