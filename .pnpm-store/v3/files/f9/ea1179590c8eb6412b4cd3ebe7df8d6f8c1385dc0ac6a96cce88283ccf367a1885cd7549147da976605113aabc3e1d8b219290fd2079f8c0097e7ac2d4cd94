import * as path from "path";
import { compiler } from "@modern-js/babel-compiler";
import { fs, getAliasConfig, json5 } from "@modern-js/utils";
import { FILE_EXTENSIONS } from "../../common";
import { applyUserBabelConfig, getBabelConfig } from "./preset";
export * from "@babel/core";
const readTsConfig = (tsconfigPath, noExistReturn = null) => {
  if (!fs.existsSync(tsconfigPath)) {
    return noExistReturn;
  }
  const content = fs.readFileSync(tsconfigPath, "utf-8");
  return json5.parse(content);
};
const existTsConfigFile = (tsconfigAbsolutePath) => {
  const tsconfig = readTsConfig(tsconfigAbsolutePath);
  return Boolean(tsconfig);
};
const resolveBabelConfig = (appDirectory, config, option, isEsm) => {
  const { alias, babelConfig } = config;
  const aliasConfig = getAliasConfig(alias, {
    appDirectory,
    ...option
  });
  const defaultBabelConfig = getBabelConfig({
    appDirectory,
    alias: aliasConfig,
    isEsm
  });
  return applyUserBabelConfig(defaultBabelConfig, babelConfig);
};
const compileByBabel = async (appDirectory, config, compileOptions) => {
  const { sourceDirs, distDir, tsconfigPath, moduleType } = compileOptions;
  const isEsm = moduleType === "module";
  const results = await Promise.all(sourceDirs.map(async (sourceDir) => {
    const babelConfig = resolveBabelConfig(appDirectory, config, {
      tsconfigPath: tsconfigPath ? tsconfigPath : ""
    }, isEsm);
    if (await fs.pathExists(sourceDir)) {
      const basename = path.basename(sourceDir);
      const targetDir = path.join(distDir, basename);
      await fs.copy(sourceDir, targetDir, {
        filter: (src) => ![
          ".ts",
          ".js"
        ].includes(path.extname(src)) && src !== tsconfigPath
      });
    }
    return compiler({
      rootDir: appDirectory,
      distDir,
      sourceDir,
      extensions: FILE_EXTENSIONS
    }, babelConfig);
  }));
  results.forEach((result) => {
    if (result.code === 1) {
      throw new Error(result.message);
    }
  });
};
export {
  compileByBabel,
  existTsConfigFile,
  readTsConfig,
  resolveBabelConfig
};
