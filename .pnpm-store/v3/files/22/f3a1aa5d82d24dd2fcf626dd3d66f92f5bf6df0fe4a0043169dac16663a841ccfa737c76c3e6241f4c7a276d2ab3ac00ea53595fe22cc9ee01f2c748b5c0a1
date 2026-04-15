import path from "path";
import { fs } from "@modern-js/utils";
import { FILE_SYSTEM_ROUTES_COMPONENTS_DIR, FILE_SYSTEM_ROUTES_DYNAMIC_REGEXP, FILE_SYSTEM_ROUTES_INDEX, FILE_SYSTEM_ROUTES_LAYOUT } from "../../constants";
import { makeLegalIdentifier } from "../makeLegalIdentifier";
import { replaceWithAlias } from "../utils";
import { debug, findLayout, getRouteWeight, shouldSkip } from "./utils";
const compName = (srcDirectory, filePath) => {
  const legalCompName = makeLegalIdentifier(path.relative(srcDirectory, filePath));
  return `Comp_${legalCompName}`;
};
const layoutNameAbbr = (filePath) => {
  const prefix = "L_";
  const dirName = path.dirname(filePath).split("/").pop() || "";
  return `${prefix}${makeLegalIdentifier(dirName)}`;
};
const parents = [];
const recursiveReadDirLegacy = ({ dir, routes, basePath = "/", srcDirectory, srcAlias }) => {
  let hasDynamicRoute = false;
  let resetParent = false;
  let parent = parents[parents.length - 1];
  const layout = findLayout(dir);
  if (layout) {
    if (basePath === "/") {
      throw new Error(`should use _app instead of _layout in ${dir}`);
    } else {
      const alias = replaceWithAlias(srcDirectory, layout, srcAlias);
      const componentName = compName(srcDirectory, layout);
      const route = {
        path: `${basePath.substring(0, basePath.length - 1)}`,
        exact: false,
        routes: [],
        _component: alias,
        component: componentName,
        parent
      };
      parent = route;
      resetParent = true;
      routes.push(route);
      parents.push(route);
      routes = route.routes;
    }
  }
  for (const relative of fs.readdirSync(dir)) {
    const filePath = path.join(dir, relative);
    if (!shouldSkip(filePath)) {
      const filename = path.basename(filePath, path.extname(filePath));
      const alias = replaceWithAlias(srcDirectory, filePath, srcAlias);
      const componentName = compName(srcDirectory, filePath);
      const dynamicRouteMatched = FILE_SYSTEM_ROUTES_DYNAMIC_REGEXP.exec(filename);
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
        exact: true,
        parent
      };
      if (fs.statSync(filePath).isDirectory()) {
        recursiveReadDirLegacy({
          dir: filePath,
          routes,
          basePath: `${route.path}/`,
          srcDirectory,
          srcAlias
        });
        continue;
      }
      if (filename === FILE_SYSTEM_ROUTES_LAYOUT) {
        continue;
      }
      if (filename === FILE_SYSTEM_ROUTES_INDEX) {
        route.path = basePath === "/" ? basePath : `${basePath.substring(0, basePath.length - 1)}`;
      }
      if (filename === "404" && basePath === "/") {
        route.path = "*";
        route.exact = false;
      }
      routes.push(route);
    }
  }
  if (resetParent) {
    parents.pop();
  }
};
const normalizeNestedRoutes = (nested, internalComponentsDir, internalDirectory, internalDirAlias) => {
  const flat = (routes) => routes.reduce((memo, route) => memo.concat(Array.isArray(route.routes) ? flat(route.routes) : [
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
    const file = path.resolve(internalComponentsDir, `${lastComponent}.jsx`);
    fs.outputFileSync(file, `${imports.join("\n")}
${codes.join("\n")}
export default ${lastComponent}`);
    return {
      component: lastComponent,
      _component: replaceWithAlias(internalDirectory, file, internalDirAlias)
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
  const { entry, entryName } = entrypoint;
  if (!fs.existsSync(entry)) {
    throw new Error(`generate file system routes error, ${entry} directory not found.`);
  }
  if (!(fs.existsSync(entry) && fs.statSync(entry).isDirectory())) {
    throw new Error(`generate file system routes error, ${entry} should be directory.`);
  }
  let routes = [];
  recursiveReadDirLegacy({
    dir: entry,
    routes,
    basePath: "/",
    srcDirectory,
    srcAlias
  });
  const internalComponentsDir = path.resolve(internalDirectory, `${entryName}/${FILE_SYSTEM_ROUTES_COMPONENTS_DIR}`);
  fs.emptyDirSync(internalComponentsDir);
  routes = normalizeNestedRoutes(routes, internalComponentsDir, internalDirectory, internalDirAlias);
  parents.length = 0;
  routes.sort((a, b) => {
    const delta = getRouteWeight(a.path) - getRouteWeight(b.path);
    if (delta === 0) {
      return a.path.length - b.path.length;
    }
    return delta;
  });
  debug(`fileSystem routes: %o`, routes);
  return routes;
};
export {
  getClientRoutes
};
