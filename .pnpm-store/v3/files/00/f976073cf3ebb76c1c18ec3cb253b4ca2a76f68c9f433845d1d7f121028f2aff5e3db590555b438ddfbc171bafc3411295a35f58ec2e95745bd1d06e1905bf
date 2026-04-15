import { type Router, type StaticHandlerContext } from '@modern-js/runtime-utils/remix-router';
import type { NestedRoute, PageRoute, Reporter, SSRMode } from '@modern-js/types';
import type React from 'react';
import type { RouterConfig } from './types';
export declare function getRouteComponents(routes: (NestedRoute | PageRoute)[], { globalApp, ssrMode, props, reporter, }: {
    globalApp?: React.ComponentType<any>;
    ssrMode?: SSRMode;
    props?: Record<string, any>;
    reporter?: Reporter;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
export declare function renderRoutes({ routesConfig, props, ssrMode, reporter, }: {
    routesConfig: RouterConfig['routesConfig'];
    props?: Record<string, any>;
    ssrMode?: SSRMode;
    reporter?: Reporter;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>[] | null;
export declare function getLocation(serverContext: any): string;
export declare const urlJoin: (...parts: string[]) => string;
export declare function standardSlash(str: string): string;
/**
 * forked from https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/errors.ts
 * license at https://github.com/remix-run/remix/blob/main/LICENSE.md
 */
export declare function serializeErrors(errors: StaticHandlerContext['errors']): StaticHandlerContext['errors'];
/**
 * forked from https://github.com/remix-run/remix/blob/main/packages/remix-react/errors.ts
 * license at https://github.com/remix-run/remix/blob/main/LICENSE.md
 */
export declare function deserializeErrors(errors: Router['state']['errors']): Router['state']['errors'];
