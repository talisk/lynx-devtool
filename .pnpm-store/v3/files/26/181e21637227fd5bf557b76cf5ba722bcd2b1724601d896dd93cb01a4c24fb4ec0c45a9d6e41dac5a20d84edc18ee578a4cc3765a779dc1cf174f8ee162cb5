/// <reference types="react" />
import type { NestedRoute, PageRoute } from '@modern-js/types';
import type { AppConfig } from '../../common';
export { RuntimeReactContext, type RuntimeContext, getInitialContext, } from './runtime';
interface GlobalContext {
    /**
     * App.tsx export default component
     */
    App?: React.ComponentType;
    /**
     * nest router and page router config
     */
    routes?: (NestedRoute | PageRoute)[];
    /**
     * nest router init function
     */
    appInit?: () => Promise<unknown>;
    /**
     * nest router config function
     */
    appConfig?: AppConfig;
    /**
     * page router _app.tsx export layout app
     */
    layoutApp?: React.ComponentType;
}
export declare function setGlobalContext(context: Omit<GlobalContext, 'appConfig'> & {
    appConfig?: () => AppConfig;
}): void;
export declare function getGlobalApp(): import("react").ComponentType<{}> | undefined;
export declare function getGlobalRoutes(): undefined | (NestedRoute | PageRoute)[];
export declare function getGlobalAppInit(): any;
export declare function getGlobalAppConfig(): any;
export declare function getGlobalLayoutApp(): import("react").ComponentType<{}> | undefined;
