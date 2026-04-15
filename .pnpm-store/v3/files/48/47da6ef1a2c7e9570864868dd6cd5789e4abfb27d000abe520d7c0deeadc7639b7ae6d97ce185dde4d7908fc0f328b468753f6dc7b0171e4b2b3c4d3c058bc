import type { Reporter } from '@modern-js/types';
export { createRequestContext, type RequestContext } from './createRequestCtx';
export type { LoaderContext } from './createLoaderCtx';
/**
 * @deprecated
 * Use `context.get('reporter')` instead of `context.get(reporterCtx)`. The `reporterCtx` will be removed in next major version.
 *
 * @example
 *
 * const loader = ({ context }: LoaderFunctionArgs) => {
 *  const reporter = context?.get('reporter')
 *  // doSomething
 * }
 *
 */
export declare const reporterCtx: import("./createLoaderCtx").LoaderContext<Reporter>;
