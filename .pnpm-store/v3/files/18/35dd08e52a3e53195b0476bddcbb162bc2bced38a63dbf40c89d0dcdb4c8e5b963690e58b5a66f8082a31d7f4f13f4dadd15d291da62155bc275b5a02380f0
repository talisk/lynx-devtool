import * as path from "path";
import { bundle } from "@modern-js/node-bundle-require";
import { fs, CONFIG_FILE_EXTENSIONS, OUTPUT_CONFIG_FILE, ensureAbsolutePath, getServerConfig } from "@modern-js/utils";
import { stringify } from "flatted";
const defineServerConfig = (config) => config;
const buildServerConfig = async ({ appDirectory, distDirectory, configFile, options, watch }) => {
  const configFilePath = await getServerConfig(appDirectory, configFile);
  const getOutputFile = async (filepath) => path.resolve(distDirectory, `${filepath.replace(new RegExp(CONFIG_FILE_EXTENSIONS.join("|")), "")}.cjs`);
  if (configFilePath) {
    const configHelperFilePath = path.normalize(path.join(distDirectory, "./config-helper.js"));
    const helperCode = `
      export const defineConfig = (config) => config;
    `;
    await fs.ensureDir(distDirectory);
    await fs.writeFile(configHelperFilePath, helperCode);
    await bundle(configFilePath, {
      ...options,
      watch,
      getOutputFile,
      esbuildPlugins: [
        {
          name: "native-build-config",
          setup(ctx) {
            ctx.onResolve({
              filter: /app-tools\/server/
            }, () => {
              return {
                path: configHelperFilePath
              };
            });
          }
        }
      ]
    });
  }
};
const emitResolvedConfig = async (appDirectory, resolvedConfig) => {
  var _resolvedConfig_output_distPath;
  const outputPath = ensureAbsolutePath(appDirectory, path.join(((_resolvedConfig_output_distPath = resolvedConfig.output.distPath) === null || _resolvedConfig_output_distPath === void 0 ? void 0 : _resolvedConfig_output_distPath.root) || "./dist", OUTPUT_CONFIG_FILE));
  const output = stringify(resolvedConfig);
  await fs.writeFile(outputPath, output, {
    encoding: "utf-8"
  });
};
export {
  buildServerConfig,
  defineServerConfig,
  emitResolvedConfig
};
