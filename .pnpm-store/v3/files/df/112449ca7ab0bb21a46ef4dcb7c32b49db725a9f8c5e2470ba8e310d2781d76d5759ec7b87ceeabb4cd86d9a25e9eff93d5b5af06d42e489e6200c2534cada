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
var PrefetchLink_exports = {};
__export(PrefetchLink_exports, {
  Link: () => Link,
  NavLink: () => NavLink,
  composeEventHandlers: () => composeEventHandlers
});
module.exports = __toCommonJS(PrefetchLink_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_router = require("@modern-js/runtime-utils/router");
var import_react = __toESM(require("react"));
var import_core = require("../../core");
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler === null || theirHandler === void 0 ? void 0 : theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function usePrefetchBehavior(prefetch, theirElementProps) {
  const [maybePrefetch, setMaybePrefetch] = import_react.default.useState(false);
  const [shouldPrefetch, setShouldPrefetch] = import_react.default.useState(false);
  const { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  import_react.default.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
  }, [
    prefetch
  ]);
  const setIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(true);
    }
  };
  const cancelIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(false);
      setShouldPrefetch(false);
    }
  };
  import_react.default.useEffect(() => {
    if (maybePrefetch) {
      const id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [
    maybePrefetch
  ]);
  return [
    shouldPrefetch,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
async function loadRouteModule(route, routeAssets) {
  const routeId = route.id;
  if (!routeId) {
    return;
  }
  if (!routeAssets[routeId]) {
    return;
  }
  const { chunkIds } = routeAssets[routeId];
  if (!chunkIds) {
    return;
  }
  try {
    await Promise.all(chunkIds.map((chunkId) => {
      return __webpack_chunk_load__ === null || __webpack_chunk_load__ === void 0 ? void 0 : __webpack_chunk_load__(chunkId);
    }));
  } catch (error) {
    console.error(error);
  }
}
const getRequestUrl = (pathname, routeId) => {
  const LOADER_ID_PARAM = "__loader";
  const DIRECT_PARAM = "__ssrDirect";
  const { protocol, host } = window.location;
  const url = new URL(pathname, `${protocol}//${host}`);
  url.searchParams.append(LOADER_ID_PARAM, routeId);
  url.searchParams.append(DIRECT_PARAM, "true");
  return url;
};
const createDataHref = (href) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
    rel: "prefetch",
    as: "fetch",
    href
  }, href);
};
const getDataHref = (route, pathname, basename) => {
  const { id } = route;
  const path = basename === "/" ? pathname : `${basename}${pathname}`;
  const url = getRequestUrl(path, id);
  return createDataHref(url.toString());
};
const PrefetchPageLinks = ({ path }) => {
  const { pathname } = path;
  const context = (0, import_react.useContext)(import_core.RuntimeReactContext);
  const { routeManifest, routes } = context;
  const { routeAssets } = routeManifest || {};
  const matches = Array.isArray(routes) ? (0, import_router.matchRoutes)(routes, pathname) : [];
  if (Array.isArray(matches) && routeAssets) {
    matches === null || matches === void 0 ? void 0 : matches.forEach((match) => loadRouteModule(match.route, routeAssets));
  }
  if (!window._SSR_DATA) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrefetchDataLinks, {
    matches,
    path,
    routeManifest
  });
};
const PrefetchDataLinks = ({ matches, path, routeManifest }) => {
  const { pathname, search, hash } = path;
  const currentMatches = (0, import_router.useMatches)();
  const basename = (0, import_router.useHref)("/");
  const dataHrefs = (0, import_react.useMemo)(() => {
    return matches === null || matches === void 0 ? void 0 : matches.filter((match, index) => {
      if (!match.route.loader || typeof match.route.loader !== "function" || match.route.loader.length === 0) {
        return false;
      }
      if (match.route.shouldRevalidate) {
        var _currentMatches_;
        const currentUrl = new URL(location.pathname + location.search + location.hash, window.origin);
        const nextUrl = new URL(pathname + search + hash, window.origin);
        const shouldLoad = match.route.shouldRevalidate({
          currentUrl,
          currentParams: ((_currentMatches_ = currentMatches[0]) === null || _currentMatches_ === void 0 ? void 0 : _currentMatches_.params) || {},
          nextUrl,
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof shouldLoad === "boolean") {
          return shouldLoad;
        }
      }
      const currentMatch = currentMatches[index];
      if (!currentMatch || currentMatch.id !== match.route.id) {
        return true;
      }
      if (currentMatch.pathname !== match.pathname) {
        return true;
      }
      if (currentMatch.pathname.endsWith("*") && currentMatch.params["*"] !== match.params["*"]) {
        return true;
      }
      return false;
    }).map((match) => getDataHref(match.route, pathname, basename));
  }, [
    matches,
    pathname,
    routeManifest
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: dataHrefs
  });
};
const createPrefetchLink = (Link2) => {
  return /* @__PURE__ */ import_react.default.forwardRef(({ to, prefetch = "none", ...props }, forwardedRef) => {
    const isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
    const [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
    const resolvedPath = (0, import_router.useResolvedPath)(to);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
          ref: forwardedRef,
          to,
          ...props,
          ...prefetchHandlers
        }),
        shouldPrefetch && __webpack_chunk_load__ && !isAbsolute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrefetchPageLinks, {
          path: resolvedPath
        }) : null
      ]
    });
  });
};
const Link = createPrefetchLink(import_router.Link);
Link.displayName = "Link";
const NavLink = createPrefetchLink(import_router.NavLink);
NavLink.displayName = "NavLink";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Link,
  NavLink,
  composeEventHandlers
});
