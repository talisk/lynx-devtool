import type { AppNormalizedConfig, IAppContext } from '@modern-js/app-tools';
import type { Entrypoint, NestedRouteForCli, PageRoute, RouteLegacy, SSRMode } from '@modern-js/types';
export declare const routesForServer: ({ routesForServerLoaderMatches, }: {
    routesForServerLoaderMatches: (NestedRouteForCli | PageRoute)[];
}) => string;
export declare const fileSystemRoutes: ({ metaName, routes, ssrMode, nestedRoutesEntry, entryName, internalDirectory, splitRouteChunks, }: {
    metaName: string;
    routes: RouteLegacy[] | (NestedRouteForCli | PageRoute)[];
    ssrMode?: SSRMode | undefined;
    nestedRoutesEntry?: string | undefined;
    entryName: string;
    internalDirectory: string;
    splitRouteChunks?: boolean | undefined;
}) => Promise<string>;
export declare function ssrLoaderCombinedModule(entrypoints: Entrypoint[], entrypoint: Entrypoint, config: AppNormalizedConfig<'shared'>, appContext: IAppContext): string | null;
export declare const runtimeGlobalContext: ({ metaName, srcDirectory, nestedRoutesEntry, internalSrcAlias, globalApp, }: {
    metaName: string;
    srcDirectory: string;
    nestedRoutesEntry?: string | undefined;
    internalSrcAlias: string;
    globalApp?: string | false | undefined;
}) => Promise<string>;
