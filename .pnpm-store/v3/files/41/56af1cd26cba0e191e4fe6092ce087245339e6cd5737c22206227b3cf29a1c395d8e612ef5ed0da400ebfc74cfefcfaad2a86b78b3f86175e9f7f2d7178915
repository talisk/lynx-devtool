import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link as RouterLink, NavLink as RouterNavLink, matchRoutes, useHref, useMatches, useResolvedPath } from "@modern-js/runtime-utils/router";
import React, { useContext, useMemo } from "react";
import { RuntimeReactContext } from "../../core";
function composeEventHandlers(theirHandler, ourHandler) {
  return function(event) {
    theirHandler === null || theirHandler === void 0 ? void 0 : theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function usePrefetchBehavior(prefetch, theirElementProps) {
  var _React_useState = _sliced_to_array(React.useState(false), 2), maybePrefetch = _React_useState[0], setMaybePrefetch = _React_useState[1];
  var _React_useState1 = _sliced_to_array(React.useState(false), 2), shouldPrefetch = _React_useState1[0], setShouldPrefetch = _React_useState1[1];
  var onFocus = theirElementProps.onFocus, onBlur = theirElementProps.onBlur, onMouseEnter = theirElementProps.onMouseEnter, onMouseLeave = theirElementProps.onMouseLeave, onTouchStart = theirElementProps.onTouchStart;
  React.useEffect(function() {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
  }, [
    prefetch
  ]);
  var setIntent = function() {
    if (prefetch === "intent") {
      setMaybePrefetch(true);
    }
  };
  var cancelIntent = function() {
    if (prefetch === "intent") {
      setMaybePrefetch(false);
      setShouldPrefetch(false);
    }
  };
  React.useEffect(function() {
    if (maybePrefetch) {
      var id = setTimeout(function() {
        setShouldPrefetch(true);
      }, 100);
      return function() {
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
function loadRouteModule(route, routeAssets) {
  return _loadRouteModule.apply(this, arguments);
}
function _loadRouteModule() {
  _loadRouteModule = _async_to_generator(function(route, routeAssets) {
    var routeId, chunkIds, error;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          routeId = route.id;
          if (!routeId) {
            return [
              2
            ];
          }
          if (!routeAssets[routeId]) {
            return [
              2
            ];
          }
          chunkIds = routeAssets[routeId].chunkIds;
          if (!chunkIds) {
            return [
              2
            ];
          }
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            3,
            ,
            4
          ]);
          return [
            4,
            Promise.all(chunkIds.map(function(chunkId) {
              return __webpack_chunk_load__ === null || __webpack_chunk_load__ === void 0 ? void 0 : __webpack_chunk_load__(chunkId);
            }))
          ];
        case 2:
          _state.sent();
          return [
            3,
            4
          ];
        case 3:
          error = _state.sent();
          console.error(error);
          return [
            3,
            4
          ];
        case 4:
          return [
            2
          ];
      }
    });
  });
  return _loadRouteModule.apply(this, arguments);
}
var getRequestUrl = function(pathname, routeId) {
  var LOADER_ID_PARAM = "__loader";
  var DIRECT_PARAM = "__ssrDirect";
  var _window_location = window.location, protocol = _window_location.protocol, host = _window_location.host;
  var url = new URL(pathname, "".concat(protocol, "//").concat(host));
  url.searchParams.append(LOADER_ID_PARAM, routeId);
  url.searchParams.append(DIRECT_PARAM, "true");
  return url;
};
var createDataHref = function(href) {
  return /* @__PURE__ */ _jsx("link", {
    rel: "prefetch",
    as: "fetch",
    href
  }, href);
};
var getDataHref = function(route, pathname, basename) {
  var id = route.id;
  var path = basename === "/" ? pathname : "".concat(basename).concat(pathname);
  var url = getRequestUrl(path, id);
  return createDataHref(url.toString());
};
var PrefetchPageLinks = function(param) {
  var path = param.path;
  var pathname = path.pathname;
  var context = useContext(RuntimeReactContext);
  var routeManifest = context.routeManifest, routes = context.routes;
  var routeAssets = (routeManifest || {}).routeAssets;
  var matches = Array.isArray(routes) ? matchRoutes(routes, pathname) : [];
  if (Array.isArray(matches) && routeAssets) {
    matches === null || matches === void 0 ? void 0 : matches.forEach(function(match) {
      return loadRouteModule(match.route, routeAssets);
    });
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
var PrefetchDataLinks = function(param) {
  var matches = param.matches, path = param.path, routeManifest = param.routeManifest;
  var pathname = path.pathname, search = path.search, hash = path.hash;
  var currentMatches = useMatches();
  var basename = useHref("/");
  var dataHrefs = useMemo(function() {
    return matches === null || matches === void 0 ? void 0 : matches.filter(function(match, index) {
      if (!match.route.loader || typeof match.route.loader !== "function" || match.route.loader.length === 0) {
        return false;
      }
      if (match.route.shouldRevalidate) {
        var _currentMatches_;
        var currentUrl = new URL(location.pathname + location.search + location.hash, window.origin);
        var nextUrl = new URL(pathname + search + hash, window.origin);
        var shouldLoad = match.route.shouldRevalidate({
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
      var currentMatch = currentMatches[index];
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
    }).map(function(match) {
      return getDataHref(match.route, pathname, basename);
    });
  }, [
    matches,
    pathname,
    routeManifest
  ]);
  return /* @__PURE__ */ _jsx(_Fragment, {
    children: dataHrefs
  });
};
var createPrefetchLink = function(Link2) {
  return /* @__PURE__ */ React.forwardRef(function(_param, forwardedRef) {
    var to = _param.to, _param_prefetch = _param.prefetch, prefetch = _param_prefetch === void 0 ? "none" : _param_prefetch, props = _object_without_properties(_param, [
      "to",
      "prefetch"
    ]);
    var isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
    var _usePrefetchBehavior = _sliced_to_array(usePrefetchBehavior(prefetch, props), 2), shouldPrefetch = _usePrefetchBehavior[0], prefetchHandlers = _usePrefetchBehavior[1];
    var resolvedPath = useResolvedPath(to);
    return /* @__PURE__ */ _jsxs(_Fragment, {
      children: [
        /* @__PURE__ */ _jsx(Link2, _object_spread({
          ref: forwardedRef,
          to
        }, props, prefetchHandlers)),
        shouldPrefetch && __webpack_chunk_load__ && !isAbsolute ? /* @__PURE__ */ _jsx(PrefetchPageLinks, {
          path: resolvedPath
        }) : null
      ]
    });
  });
};
var Link = createPrefetchLink(RouterLink);
Link.displayName = "Link";
var NavLink = createPrefetchLink(RouterNavLink);
NavLink.displayName = "NavLink";
export {
  Link,
  NavLink,
  composeEventHandlers
};
