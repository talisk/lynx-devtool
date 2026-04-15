import type { ServerUserConfig } from '@modern-js/app-tools';
import { type StaticHandlerContext } from '@modern-js/runtime-utils/remix-router';
import type { SSRConfig } from './shared';
export declare function attributesToString(attributes: Record<string, any>): string;
/**
 * @param source
 * @param searchValue
 * @param replaceValue
 * @returns
 */
export declare function safeReplace(source: string, searchValue: string | RegExp, replaceValue: string): string;
export declare function checkIsNode(): boolean;
/**
 * forked from https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/errors.ts
 * license at https://github.com/remix-run/remix/blob/main/LICENSE.md
 */
export declare function serializeErrors(errors: StaticHandlerContext['errors']): StaticHandlerContext['errors'];
export declare function getSSRConfigByEntry(entryName: string, ssr?: ServerUserConfig['ssr'], ssrByEntries?: ServerUserConfig['ssrByEntries']): import("@modern-js/app-tools").SSR;
export declare function getSSRMode(ssrConfig?: SSRConfig): 'string' | 'stream' | false;
