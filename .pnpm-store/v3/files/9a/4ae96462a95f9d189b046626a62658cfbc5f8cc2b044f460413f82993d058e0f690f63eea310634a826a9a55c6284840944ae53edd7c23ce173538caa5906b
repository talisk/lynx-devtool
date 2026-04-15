"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var templates_exports = {};
__export(templates_exports, {
  fileSystemRoutes: () => fileSystemRoutes,
  routesForServer: () => routesForServer,
  runtimeGlobalContext: () => runtimeGlobalContext,
  ssrLoaderCombinedModule: () => ssrLoaderCombinedModule
});
module.exports = __toCommonJS(templates_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_constants = require("@modern-js/utils/universal/constants");
var import_constants2 = require("../constants");
var import_utils2 = require("./utils");
const routesForServer = ({ routesForServerLoaderMatches }) => {
  const loaders = [];
  const actions = [];
  const loadersMap = {};
  const traverseRouteTree = (route) => {
    let children;
    if ("children" in route && route.children) {
      var _route_children;
      children = route === null || route === void 0 ? void 0 : (_route_children = route.children) === null || _route_children === void 0 ? void 0 : _route_children.map(traverseRouteTree);
    }
    let loader;
    let action;
    if (route.type === "nested") {
      if (route.loader || route.data) {
        loaders.push(route.loader);
        const loaderId = loaders.length - 1;
        loader = `loader_${loaderId}`;
        const inline = Boolean(route.data);
        loadersMap[loader] = {
          loaderId,
          routeId: route.id,
          filePath: route.data || route.loader,
          clientData: Boolean(route.clientData),
          route,
          inline
        };
        if (route.action) {
          actions.push(route.action);
          action = `action_${loaders.length - 1}`;
        }
      }
    }
    const finalRoute = {
      ...route,
      loader,
      action,
      children
    };
    return finalRoute;
  };
  let routesCode = `
  export const routes = [
  `;
  for (const route of routesForServerLoaderMatches) {
    if ("type" in route) {
      const keywords = [
        "loader",
        "action"
      ];
      const regs = keywords.map(createMatchReg);
      const newRoute = traverseRouteTree(route);
      const routeStr = JSON.stringify(newRoute, null, 2);
      routesCode += regs.reduce((acc, reg) => acc.replace(reg, "$1$2"), routeStr).replace(/\\"/g, '"');
    } else {
      routesCode += `${JSON.stringify(route, null, 2)}`;
    }
  }
  routesCode += `
];`;
  let importLoadersCode = "";
  for (const [key, loaderInfo] of Object.entries(loadersMap)) {
    if (loaderInfo.inline) {
      const { route } = loaderInfo;
      if (route.action) {
        importLoadersCode += `import { loader as ${key}, action as action_${loaderInfo.loaderId} } from "${(0, import_utils.slash)(loaderInfo.filePath)}";
`;
      } else {
        importLoadersCode += `import { loader as ${key} } from "${(0, import_utils.slash)(loaderInfo.filePath)}";
`;
      }
    } else {
      importLoadersCode += `import ${key} from "${(0, import_utils.slash)(loaderInfo.filePath)}";
`;
    }
  }
  return `
    ${importLoadersCode}
    ${routesCode}
  `;
};
const createMatchReg = (keyword) => new RegExp(`("${keyword}":\\s)"([^
]+)"`, "g");
const fileSystemRoutes = async ({ metaName, routes, ssrMode, nestedRoutesEntry, entryName, internalDirectory, splitRouteChunks = true }) => {
  const components = [];
  const loadings = [];
  const errors = [];
  const loaders = [];
  const loadersMap = {};
  const configs = [];
  const configsMap = {};
  const loadersMapFile = import_path.default.join(internalDirectory, entryName, import_constants2.TEMP_LOADERS_DIR, "map.json");
  const importLazyCode = `
    import { lazy } from "react";
    import loadable, { lazy as loadableLazy } from "@${metaName}/runtime/loadable"
  `;
  let rootLayoutCode = ``;
  const getDataLoaderPath = ({ loaderId, clientData, action, inline, routeId, inValidSSRRoute }) => {
    if (!ssrMode) {
      return "";
    }
    const clientDataStr = clientData ? `&clientData=${clientData}` : "";
    const retain = inValidSSRRoute !== null && inValidSSRRoute !== void 0 ? inValidSSRRoute : false;
    if (nestedRoutesEntry) {
      return `?loaderId=${loaderId}${clientDataStr}&action=${action ? (0, import_utils.slash)(action) : action}&inline=${inline}&routeId=${routeId}&retain=${retain}`;
    }
    return "";
  };
  const traverseRouteTree = (route) => {
    let children;
    if ("children" in route && route.children) {
      var _route_children;
      children = route === null || route === void 0 ? void 0 : (_route_children = route.children) === null || _route_children === void 0 ? void 0 : _route_children.map(traverseRouteTree);
    }
    let loading;
    let error;
    let loader;
    let action;
    let config;
    let component = "";
    let lazyImport = null;
    if (route.type === "nested") {
      if (route.loading) {
        loadings.push(route.loading);
        loading = `loading_${loadings.length - 1}`;
      }
      if (route.error) {
        errors.push(route.error);
        error = `error_${errors.length - 1}`;
      }
      if (route.loader || route.data) {
        loaders.push(route.loader);
        const loaderId = loaders.length - 1;
        loader = `loader_${loaderId}`;
        const inline = Boolean(route.data);
        loadersMap[loader] = {
          loaderId,
          routeId: route.id,
          inValidSSRRoute: route.inValidSSRRoute,
          filePath: route.data || route.loader,
          clientData: Boolean(route.clientData),
          route,
          inline
        };
        loader = `loader_${loaderId}`;
        if (route.action) {
          action = `action_${loaderId}`;
        }
      }
      if (typeof route.config === "string") {
        configs.push(route.config);
        const configId = configs.length - 1;
        config = `config_${configId}`;
        configsMap[config] = route.config;
      }
      if (route._component) {
        if (splitRouteChunks) {
          if (route.isRoot) {
            lazyImport = `() => import('${route._component}').then(routeModule => handleRouteModule(routeModule, "${route.id}")).catch(handleRouteModuleError) `;
            rootLayoutCode = `import RootLayout from '${route._component}'`;
            component = `RootLayout`;
          } else if (ssrMode === "string") {
            lazyImport = `() => import(/* webpackChunkName: "${route.id}" */  '${route._component}').then(routeModule => handleRouteModule(routeModule, "${route.id}")).catch(handleRouteModuleError) `;
            component = `loadable(${lazyImport})`;
          } else {
            lazyImport = `() => import(/* webpackChunkName: "${route.id}" */  '${route._component}').then(routeModule => handleRouteModule(routeModule, "${route.id}")).catch(handleRouteModuleError) `;
            component = `lazy(${lazyImport})`;
          }
        } else if (ssrMode === "string") {
          components.push(route._component);
          component = `component_${components.length - 1}`;
        } else {
          lazyImport = `() => import(/* webpackMode: "eager" */  '${route._component}').then(routeModule => handleRouteModule(routeModule, "${route.id}")).catch(handleRouteModuleError) `;
          component = `lazy(${lazyImport})`;
        }
      }
    } else if (route._component) {
      if (splitRouteChunks) {
        lazyImport = `() => import('${route._component}')`;
        component = `loadable(${lazyImport})`;
      } else {
        components.push(route._component);
        component = `component_${components.length - 1}`;
      }
    }
    const finalRoute = {
      ...route,
      lazyImport,
      loading,
      loader,
      action,
      config,
      error,
      children
    };
    if (route._component) {
      finalRoute.component = component;
    }
    if (route.type === "nested" && route._component && (route.loader || route.data)) {
      finalRoute.shouldRevalidate = `createShouldRevalidate("${route.id}")`;
    }
    return finalRoute;
  };
  let routeComponentsCode = `
    export const routes = [
  `;
  for (const route of routes) {
    if ("type" in route) {
      const newRoute = traverseRouteTree(route);
      const routeStr = JSON.stringify(newRoute, null, 2);
      const keywords = [
        "component",
        "lazyImport",
        "shouldRevalidate",
        "loader",
        "action",
        "loading",
        "error",
        "config"
      ];
      const regs = keywords.map(createMatchReg);
      const newRouteStr = regs.reduce((acc, reg) => acc.replace(reg, "$1$2"), routeStr).replace(/"(RootLayout)"/g, "$1").replace(/\\"/g, '"');
      routeComponentsCode += `${newRouteStr},`;
    } else {
      const component = `loadable(() => import('${route._component}'))`;
      const finalRoute = {
        ...route,
        component
      };
      const keywords = [
        "component",
        "lazyImport"
      ];
      const routeStr = JSON.stringify(finalRoute, null, 2);
      const regs = keywords.map(createMatchReg);
      const newRouteStr = regs.reduce((acc, reg) => acc.replace(reg, "$1$2"), routeStr).replace(/\\"/g, '"');
      routeComponentsCode += `${newRouteStr},`;
    }
  }
  routeComponentsCode += `
];`;
  const importLoadingCode = loadings.map((loading, index) => {
    return `import loading_${index} from '${loading}';
`;
  }).join("");
  const importComponentsCode = components.map((component, index) => {
    return `import component_${index} from '${component}';
`;
  }).join("");
  const importErrorComponentsCode = errors.map((error, index) => {
    return `import error_${index} from '${error}';
`;
  }).join("");
  let importLoadersCode = "";
  for (const [key, loaderInfo] of Object.entries(loadersMap)) {
    if (loaderInfo.inline) {
      const { route } = loaderInfo;
      if (route.action) {
        importLoadersCode += `import { loader as ${key}, action as action_${loaderInfo.loaderId} } from "${(0, import_utils.slash)(loaderInfo.filePath)}${getDataLoaderPath({
          loaderId: key,
          clientData: loaderInfo.clientData,
          action: route.action,
          inline: loaderInfo.inline,
          routeId: loaderInfo.routeId,
          inValidSSRRoute: loaderInfo.inValidSSRRoute
        })}";
`;
      } else {
        importLoadersCode += `import { loader as ${key} } from "${(0, import_utils.slash)(loaderInfo.filePath)}${getDataLoaderPath({
          loaderId: key,
          clientData: loaderInfo.clientData,
          action: false,
          inline: loaderInfo.inline,
          routeId: route.id,
          inValidSSRRoute: loaderInfo.inValidSSRRoute
        })}";
`;
      }
    } else {
      importLoadersCode += `import ${key} from "${(0, import_utils.slash)(loaderInfo.filePath)}${getDataLoaderPath({
        loaderId: key,
        clientData: loaderInfo.clientData,
        action: false,
        inline: loaderInfo.inline,
        routeId: loaderInfo.routeId,
        inValidSSRRoute: loaderInfo.inValidSSRRoute
      })}";
`;
    }
  }
  let importConfigsCode = "";
  for (const [key, configPath] of Object.entries(configsMap)) {
    importConfigsCode += `import * as ${key} from "${(0, import_utils.slash)(configPath)}";
`;
  }
  await import_utils.fs.ensureFile(loadersMapFile);
  await import_utils.fs.writeJSON(loadersMapFile, loadersMap);
  const importRuntimeRouterCode = `
    import { createShouldRevalidate, handleRouteModule,  handleRouteModuleError} from '@${metaName}/runtime/router';
  `;
  const routeModulesCode = `
    if(typeof document !== 'undefined'){
      window.${import_constants.ROUTE_MODULES} = {}
    }
  `;
  return `
    ${importLazyCode}
    ${importComponentsCode}
    ${importRuntimeRouterCode}
    ${rootLayoutCode}
    ${importLoadingCode}
    ${importErrorComponentsCode}
    ${importLoadersCode}
    ${importConfigsCode}
    ${routeModulesCode}
    ${routeComponentsCode}
  `;
};
function ssrLoaderCombinedModule(entrypoints, entrypoint, config, appContext) {
  const { entryName, isMainEntry } = entrypoint;
  const { packageName, internalDirectory } = appContext;
  const ssr = (0, import_utils.getEntryOptions)(entryName, isMainEntry, config.server.ssr, config.server.ssrByEntries, packageName);
  const ssg = (0, import_utils.isSSGEntry)(config, entryName, entrypoints);
  if (entrypoint.nestedRoutesEntry && (ssr || ssg)) {
    const serverLoaderRuntime = require.resolve("@modern-js/plugin-data-loader/runtime");
    const serverLoadersFile = (0, import_utils2.getServerLoadersFile)(internalDirectory, entryName);
    const combinedModule = `export * from "${(0, import_utils.slash)(serverLoaderRuntime)}"; export * from "${(0, import_utils.slash)(serverLoadersFile)}"`;
    if (!config.source.enableAsyncEntry) {
      return combinedModule;
    }
    return `
    async function loadModules() {
      const [moduleA, moduleB] = await Promise.all([
        import("${(0, import_utils.slash)(serverLoaderRuntime)}"),
        import("${(0, import_utils.slash)(serverLoadersFile)}")
      ]);

      return {
        ...moduleA,
        ...moduleB
      };
    }

    export { loadModules };
    `;
  }
  return null;
}
const runtimeGlobalContext = async ({ metaName, srcDirectory, nestedRoutesEntry, internalSrcAlias, globalApp }) => {
  const imports = [
    `import { setGlobalContext } from '@${metaName}/runtime/context';`
  ];
  if (nestedRoutesEntry) {
    const rootLayoutPath = import_path.default.join(nestedRoutesEntry, "layout");
    const rootLayoutFile = (0, import_utils.findExists)([
      ".js",
      ".ts",
      ".jsx",
      ".tsx"
    ].map((ext) => `${rootLayoutPath}${ext}`));
    if (rootLayoutFile) {
      const rootLayoutBuffer = await import_utils.fs.readFile(rootLayoutFile);
      const rootLayout = rootLayoutBuffer.toString();
      const [, moduleExports] = await (0, import_utils2.parseModule)({
        source: rootLayout.toString(),
        filename: rootLayoutFile
      });
      const hasAppConfig = moduleExports.some((e) => e.n === import_constants2.APP_CONFIG_NAME);
      const hasAppInit = moduleExports.some((e) => e.n === import_constants2.APP_INIT_EXPORTED);
      const layoutPath = (0, import_utils.formatImportPath)((0, import_utils2.getPathWithoutExt)((0, import_utils2.replaceWithAlias)(srcDirectory, rootLayoutFile, internalSrcAlias)));
      if (hasAppConfig) {
        imports.push(`import { config as appConfig } from '${layoutPath}';`);
      } else {
        imports.push(`let appConfig;`);
      }
      if (hasAppInit) {
        imports.push(`import { init as appInit } from '${layoutPath}';`);
      } else {
        imports.push(`let appInit;`);
      }
    }
  } else {
    imports.push(`let appConfig;`);
    imports.push(`let appInit;`);
  }
  if (globalApp) {
    imports.push(`import layoutApp from '${(0, import_utils.formatImportPath)(globalApp.replace(srcDirectory, internalSrcAlias))}';`);
  } else {
    imports.push(`let layoutApp;`);
  }
  return `${imports.join("\n")}

import { routes } from './routes';

setGlobalContext({
  layoutApp,
  routes,
  appInit,
  appConfig,
});`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileSystemRoutes,
  routesForServer,
  runtimeGlobalContext,
  ssrLoaderCombinedModule
});
