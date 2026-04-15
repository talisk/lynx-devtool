import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link as RouterLink, NavLink as RouterNavLink, matchRoutes, useHref, useMatches, useResolvedPath } from "@modern-js/runtime-utils/router";
import React, { useContext, useMemo } from "react";
import { RuntimeReactContext } from "../../core";
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
  const [maybePrefetch, setMaybePrefetch] = React.useState(false);
  const [shouldPrefetch, setShouldPrefetch] = React.useState(false);
  const { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  return /* @__PURE__ */ _jsx("link", {
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
  const context = useContext(RuntimeReactContext);
  const { routeManifest, routes } = context;
  const { routeAssets } = routeManifest || {};
  const matches = Array.isArray(routes) ? matchRoutes(routes, pathname) : [];
  if (Array.isArray(matches) && routeAssets) {
    matches === null || matches === void 0 ? void 0 : matches.forEach((match) => loadRouteModule(match.route, routeAssets));
  }
  if (!window._SSR_DATA) {
    return null;
  }
  return /* @__PURE__ */ _jsx(PrefetchDataLinks, {
    matches,
    path,
    routeManifest
  });
};
const PrefetchDataLinks = ({ matches, path, routeManifest }) => {
  const { pathname, search, hash } = path;
  const currentMatches = useMatches();
  const basename = useHref("/");
  const dataHrefs = useMemo(() => {
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
  return /* @__PURE__ */ _jsx(_Fragment, {
    children: dataHrefs
  });
};
const createPrefetchLink = (Link2) => {
  return /* @__PURE__ */ React.forwardRef(({ to, prefetch = "none", ...props }, forwardedRef) => {
    const isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
    const [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
    const resolvedPath = useResolvedPath(to);
    return /* @__PURE__ */ _jsxs(_Fragment, {
      children: [
        /* @__PURE__ */ _jsx(Link2, {
          ref: forwardedRef,
          to,
          ...props,
          ...prefetchHandlers
        }),
        shouldPrefetch && __webpack_chunk_load__ && !isAbsolute ? /* @__PURE__ */ _jsx(PrefetchPageLinks, {
          path: resolvedPath
        }) : null
      ]
    });
  });
};
const Link = createPrefetchLink(RouterLink);
Link.displayName = "Link";
const NavLink = createPrefetchLink(RouterNavLink);
NavLink.displayName = "NavLink";
export {
  Link,
  NavLink,
  composeEventHandlers
};
