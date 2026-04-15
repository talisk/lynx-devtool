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
var getRoutes_exports = {};
__export(getRoutes_exports, {
  getClientRoutes: () => getClientRoutes
});
module.exports = __toCommonJS(getRoutes_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_constants = require("../../constants");
var import_makeLegalIdentifier = require("../makeLegalIdentifier");
var import_utils2 = require("../utils");
var import_utils3 = require("./utils");
const compName = (srcDirectory, filePath) => {
  const legalCompName = (0, import_makeLegalIdentifier.makeLegalIdentifier)(import_path.default.relative(srcDirectory, filePath));
  return `Comp_${legalCompName}`;
};
const layoutNameAbbr = (filePath) => {
  const prefix = "L_";
  const dirName = import_path.default.dirname(filePath).split("/").pop() || "";
  return `${prefix}${(0, import_makeLegalIdentifier.makeLegalIdentifier)(dirName)}`;
};
const parents = [];
const recursiveReadDir = ({ dir, routes, basePath = "/", srcDirectory, srcAlias }) => {
  let hasDynamicRoute = false;
  let resetParent = false;
  let parent = parents[parents.length - 1];
  const layout = (0, import_utils3.findLayout)(dir);
  if (layout) {
    if (basePath === "/") {
      throw new Error(`should use _app instead of _layout in ${dir}`);
    } else {
      const alias = (0, import_utils2.replaceWithAlias)(srcDirectory, layout, srcAlias);
      const componentName = compName(srcDirectory, layout);
      const route = {
        path: `${basePath.substring(0, basePath.length - 1)}`,
        children: [],
        _component: alias,
        component: componentName,
        parent,
        type: "page"
      };
      parent = route;
      resetParent = true;
      routes.push(route);
      parents.push(route);
      routes = route.children;
    }
  }
  for (const relative of import_utils.fs.readdirSync(dir)) {
    const filePath = import_path.default.join(dir, relative);
    if (!(0, import_utils3.shouldSkip)(filePath)) {
      const filename = import_path.default.basename(filePath, import_path.default.extname(filePath));
      const alias = (0, import_utils2.replaceWithAlias)(srcDirectory, filePath, srcAlias);
      const componentName = compName(srcDirectory, filePath);
      const dynamicRouteMatched = import_constants.FILE_SYSTEM_ROUTES_DYNAMIC_REGEXP.exec(filename);
      if (dynamicRouteMatched) {
        if (hasDynamicRoute) {
          throw new Error(`Can't set two dynamic route in one directory: ${dir}`);
        } else {
          hasDynamicRoute = true;
        }
      }
      const route = {
        path: `${basePath}${dynamicRouteMatched ? `:${dynamicRouteMatched[1].replace(/\$$/, "?")}${dynamicRouteMatched[2]}` : filename}`,
        _component: alias,
        component: componentName,
        parent,
        type: "page"
      };
      if (import_utils.fs.statSync(filePath).isDirectory()) {
        recursiveReadDir({
          dir: filePath,
          routes,
          basePath: `${route.path}/`,
          srcDirectory,
          srcAlias
        });
        continue;
      }
      if (filename === import_constants.FILE_SYSTEM_ROUTES_LAYOUT) {
        continue;
      }
      if (filename === import_constants.FILE_SYSTEM_ROUTES_INDEX) {
        route.path = basePath === "/" ? basePath : `${basePath.substring(0, basePath.length - 1)}`;
      }
      if (filename === "404" && basePath === "/") {
        route.path = "*";
      }
      routes.push(route);
    }
  }
  if (resetParent) {
    parents.pop();
  }
};
const normalizeNestedRoutes = (nested, internalComponentsDir, internalDirectory, internalDirAlias) => {
  const flat = (routes) => routes.reduce((memo, route) => memo.concat(Array.isArray(route.children) ? flat(route.children) : [
    route
  ]), []);
  const generate = (route) => {
    const codes = [];
    let lastComponent = route.component;
    const imports = [
      `import React from 'react';`,
      `import ${lastComponent} from '${route._component}'`
    ];
    while (route = route.parent) {
      const layoutComponent = route.component;
      const layoutComponentAbbr = layoutNameAbbr(route._component);
      imports.push(`import ${layoutComponent} from '${route._component}';`);
      const currentComponent = `${layoutComponentAbbr}_${lastComponent}`;
      codes.push(`const ${currentComponent} = props => <${layoutComponent} Component={${lastComponent}} {...props} />;`);
      lastComponent = currentComponent;
    }
    const file = import_path.default.resolve(internalComponentsDir, `${lastComponent}.jsx`);
    import_utils.fs.outputFileSync(file, `${imports.join("\n")}
${codes.join("\n")}
export default ${lastComponent}`);
    return {
      component: lastComponent,
      _component: (0, import_utils2.replaceWithAlias)(internalDirectory, file, internalDirAlias)
    };
  };
  const normalized = flat(nested).map((route) => route.parent ? {
    ...route,
    ...generate(route),
    parent: void 0
  } : {
    ...route,
    parent: void 0
  });
  return normalized;
};
const getClientRoutes = ({ entrypoint, srcDirectory, srcAlias, internalDirectory, internalDirAlias }) => {
  const { entryName, pageRoutesEntry } = entrypoint;
  if (!pageRoutesEntry) {
    return [];
  }
  if (!import_utils.fs.existsSync(pageRoutesEntry)) {
    throw new Error(`generate file system routes error, ${pageRoutesEntry} directory not found.`);
  }
  if (!(import_utils.fs.existsSync(pageRoutesEntry) && import_utils.fs.statSync(pageRoutesEntry).isDirectory())) {
    throw new Error(`generate file system routes error, ${pageRoutesEntry} should be directory.`);
  }
  let routes = [];
  recursiveReadDir({
    dir: pageRoutesEntry,
    routes,
    basePath: "/",
    srcDirectory,
    srcAlias
  });
  const internalComponentsDir = import_path.default.resolve(internalDirectory, `${entryName}/${import_constants.FILE_SYSTEM_ROUTES_COMPONENTS_DIR}`);
  import_utils.fs.emptyDirSync(internalComponentsDir);
  routes = normalizeNestedRoutes(routes, internalComponentsDir, internalDirectory, internalDirAlias);
  parents.length = 0;
  routes.sort((a, b) => {
    const delta = (0, import_utils3.getRouteWeight)(a.path) - (0, import_utils3.getRouteWeight)(b.path);
    if (delta === 0) {
      return a.path.length - b.path.length;
    }
    return delta;
  });
  (0, import_utils3.debug)(`fileSystem routes: %o`, routes);
  return routes;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getClientRoutes
});
