import path from "path";
import { getUserAlias } from "@modern-js/utils";
import { createMatchPath } from "@modern-js/utils/tsconfig-paths";
const { resolvePath } = require("@modern-js/babel-plugin-module-resolver");
const defaultPaths = {
  "@": [
    "./src"
  ]
};
const aliasPlugin = (alias) => {
  const { absoluteBaseUrl, isTsPath, isTsProject = false } = alias;
  const mergedPaths = isTsPath ? alias.paths || {} : {
    ...defaultPaths,
    ...alias.paths || {}
  };
  let tsPaths = {};
  if (isTsProject) {
    tsPaths = getUserAlias(mergedPaths);
  }
  tsPaths = Object.keys(tsPaths).reduce((o, key) => {
    if (typeof tsPaths[key] === "string") {
      return {
        ...o,
        [`${key}`]: [
          tsPaths[key]
        ]
      };
    }
    return {
      ...o,
      [`${key}`]: tsPaths[key]
    };
  }, {});
  const resolvePathFn = (sourcePath, currentFile, opts) => {
    if (sourcePath === "." || sourcePath === "./") {
      return sourcePath;
    }
    const matchPath = createMatchPath(absoluteBaseUrl, tsPaths, [
      "index"
    ]);
    const result = matchPath(sourcePath, void 0, void 0, [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ]);
    if (result) {
      const relativePath = path.relative(path.dirname(currentFile), path.dirname(result));
      const fileName = path.basename(result);
      const filePath = path.normalize(`${relativePath.length === 0 ? "." : relativePath}/${fileName}`).replace(/\\/, "/");
      return filePath.startsWith(".") ? filePath : `./${filePath}`;
    }
    return resolvePath(sourcePath, currentFile, opts);
  };
  const typescriptExts = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".es",
    ".es6",
    ".mjs"
  ];
  return [
    require.resolve("@modern-js/babel-plugin-module-resolver"),
    {
      root: absoluteBaseUrl,
      alias: mergedPaths,
      resolvePath: isTsPath ? resolvePathFn : void 0,
      extensions: isTsProject ? typescriptExts : void 0
    }
  ];
};
export {
  aliasPlugin
};
