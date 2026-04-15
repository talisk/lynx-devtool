import type { Logger } from '@modern-js/types';
import type { Context, Next, ServerEnv, ServerPlugin } from '../types';
export declare const initMonitorsPlugin: () => ServerPlugin;
export declare const injectloggerPluigin: (inputLogger?: Logger) => ServerPlugin;
export declare const injectServerTiming: () => ServerPlugin;
export declare function initReporter(entryName: string): (c: Context<ServerEnv>, next: Next) => Promise<void>;
